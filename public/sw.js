// Service Worker - Precision Solutions
// Cache estratégico para melhor performance

const CACHE_NAME = 'precision-v1.0.0';
const STATIC_CACHE = 'precision-static-v1';
const DYNAMIC_CACHE = 'precision-dynamic-v1';

// Recursos para cache estático
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/assets/css/style.css',
    '/assets/js/script.js',
    '/assets/js/i18n.js',
    '/assets/js/logger.js',
    '/assets/js/form-validation.js',
    '/assets/images/icons/logo-precision.png',
    '/assets/images/icons/favicon.svg',
    '/manifest.json'
];

// Recursos para cache dinâmico
const DYNAMIC_PATTERNS = [
    /^\/pages\//,
    /^\/assets\/images\//,
    /^\/assets\/documents\//
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
    console.log('[SW] Installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('[SW] Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('[SW] Static assets cached');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[SW] Installation failed:', error);
            })
    );
});

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('[SW] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('[SW] Activated');
                return self.clients.claim();
            })
    );
});

// Interceptação de requisições
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Estratégia Cache First para assets estáticos
    if (isStaticAsset(request)) {
        event.respondWith(cacheFirst(request, STATIC_CACHE));
        return;
    }
    
    // Estratégia Network First para páginas
    if (isPageRequest(request)) {
        event.respondWith(networkFirst(request, DYNAMIC_CACHE));
        return;
    }
    
    // Estratégia Stale While Revalidate para outros recursos
    if (isDynamicAsset(request)) {
        event.respondWith(staleWhileRevalidate(request, DYNAMIC_CACHE));
        return;
    }
    
    // Fallback para network
    event.respondWith(fetch(request));
});

// Estratégia Cache First
async function cacheFirst(request, cacheName) {
    try {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(cacheName);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.error('[SW] Cache First failed:', error);
        return new Response('Offline', { status: 503 });
    }
}

// Estratégia Network First
async function networkFirst(request, cacheName) {
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(cacheName);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        console.log('[SW] Network failed, trying cache');
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Fallback para página offline
        if (request.destination === 'document') {
            return caches.match('/index.html');
        }
        
        return new Response('Offline', { status: 503 });
    }
}

// Estratégia Stale While Revalidate
async function staleWhileRevalidate(request, cacheName) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    const fetchPromise = fetch(request).then((networkResponse) => {
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    }).catch(() => cachedResponse);
    
    return cachedResponse || fetchPromise;
}

// Verificar se é asset estático
function isStaticAsset(request) {
    const url = new URL(request.url);
    return url.pathname.startsWith('/assets/css/') ||
           url.pathname.startsWith('/assets/js/') ||
           url.pathname.startsWith('/assets/images/icons/') ||
           url.pathname === '/manifest.json';
}

// Verificar se é requisição de página
function isPageRequest(request) {
    return request.destination === 'document';
}

// Verificar se é asset dinâmico
function isDynamicAsset(request) {
    const url = new URL(request.url);
    return DYNAMIC_PATTERNS.some(pattern => pattern.test(url.pathname));
}

// Mensagens do Service Worker
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Background Sync (para formulários offline)
self.addEventListener('sync', (event) => {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

async function doBackgroundSync() {
    console.log('[SW] Background sync triggered');
    // Implementar sincronização de dados offline
}

// Push Notifications (futuro)
self.addEventListener('push', (event) => {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: '/assets/images/icons/icon-192.png',
            badge: '/assets/images/icons/icon-72.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: 1
            }
        };
        
        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

console.log('[SW] Service Worker loaded');
