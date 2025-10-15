/**
 * ========================================
 * LANGUAGE INIT - INICIALIZAÇÃO DO SISTEMA
 * ========================================
 * 
 * Este arquivo é responsável por inicializar todo o sistema
 * de idiomas quando a página é carregada. Ele:
 * - Carrega todos os módulos necessários
 * - Inicializa o sistema principal
 * - Configura callbacks e event listeners
 * - Trata erros de inicialização
 * 
 * @author Precision Solutions
 * @version 2.0.0
 * @since 2024
 */

/**
 * ========================================
 * CONFIGURAÇÃO GLOBAL DO SISTEMA
 * ========================================
 * 
 * Aqui definimos todas as configurações do sistema
 * de idiomas. Estas configurações podem ser facilmente
 * modificadas para adaptar o comportamento.
 */
const LANGUAGE_SYSTEM_CONFIG = {
    // Idioma padrão do site
    defaultLanguage: 'pt',
    
    // Chave para armazenar no localStorage
    storageKey: 'precision-language',
    
    // Container onde o seletor será inserido
    selectorContainer: '.nav-menu',
    
    // Idiomas disponíveis no site
    availableLanguages: ['pt', 'en', 'es'],
    
    // Ativar modo debug (logs detalhados)
    debug: false,
    
    // Configurações de fallback
    fallbackLanguage: 'pt',
    
    // Timeout para inicialização (em ms)
    initTimeout: 5000
};

/**
 * ========================================
 * VARIÁVEIS GLOBAIS
 * ========================================
 * 
 * Variáveis que controlam o estado da inicialização
 * e armazenam referências importantes.
 */
let languageSystem = null;
let initTimeout = null;
let isInitializing = false;

/**
 * ========================================
 * FUNÇÃO PRINCIPAL DE INICIALIZAÇÃO
 * ========================================
 * 
 * Esta é a função principal que orquestra toda a
 * inicialização do sistema de idiomas.
 */
async function initializeLanguageSystem() {
    // Verificar se já está inicializando
    if (isInitializing) {
        console.log('⏳ Sistema já está sendo inicializado...');
        return;
    }

    // Verificar se já foi inicializado
    if (languageSystem && languageSystem.isReady) {
        console.log('✅ Sistema já está inicializado');
        return;
    }

    try {
        isInitializing = true;
        console.log('🚀 Iniciando sistema de idiomas...');

        // 1. Verificar se o DOM está pronto
        if (document.readyState === 'loading') {
            console.log('⏳ Aguardando DOM estar pronto...');
            await waitForDOMReady();
        }

        // 2. Verificar se todos os módulos estão carregados
        await waitForModulesLoaded();

        // 3. Criar instância do sistema
        languageSystem = new LanguageSystem({
            ...LANGUAGE_SYSTEM_CONFIG,
            
            // Callbacks personalizados
            onLanguageChange: handleLanguageChange,
            onSystemReady: handleSystemReady,
            onError: handleSystemError
        });

        // 4. Inicializar o sistema
        const success = await languageSystem.init();
        
        if (!success) {
            throw new Error('Falha na inicialização do sistema');
        }

        // 5. Configurar timeout de segurança
        setupInitTimeout();

        console.log('✅ Sistema de idiomas inicializado com sucesso!');

    } catch (error) {
        console.error('❌ Erro ao inicializar sistema de idiomas:', error);
        handleInitializationError(error);
    } finally {
        isInitializing = false;
    }
}

/**
 * ========================================
 * AGUARDAR DOM ESTAR PRONTO
 * ========================================
 * 
 * Aguarda o DOM estar completamente carregado
 * antes de prosseguir com a inicialização.
 */
function waitForDOMReady() {
    return new Promise((resolve) => {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', resolve, { once: true });
        } else {
            resolve();
        }
    });
}

/**
 * ========================================
 * AGUARDAR MÓDULOS ESTAREM CARREGADOS
 * ========================================
 * 
 * Verifica se todos os módulos necessários
 * foram carregados corretamente.
 */
async function waitForModulesLoaded() {
    const requiredModules = [
        'LanguageManager',
        'LanguageSelector', 
        'LanguageSystem',
        'Translations'
    ];

    const maxWaitTime = 3000; // 3 segundos
    const checkInterval = 100; // 100ms
    let elapsed = 0;

    while (elapsed < maxWaitTime) {
        const allLoaded = requiredModules.every(module => window[module]);
        
        if (allLoaded) {
            console.log('✅ Todos os módulos carregados');
            return;
        }

        await new Promise(resolve => setTimeout(resolve, checkInterval));
        elapsed += checkInterval;
    }

    throw new Error(`Timeout aguardando módulos: ${requiredModules.filter(m => !window[m]).join(', ')}`);
}

/**
 * ========================================
 * CONFIGURAÇÃO DE TIMEOUT DE SEGURANÇA
 * ========================================
 * 
 * Configura um timeout para garantir que a inicialização
 * não trave indefinidamente.
 */
function setupInitTimeout() {
    initTimeout = setTimeout(() => {
        if (!languageSystem || !languageSystem.isReady) {
            console.warn('⚠️ Timeout na inicialização do sistema de idiomas');
            handleInitializationError(new Error('Timeout na inicialização'));
        }
    }, LANGUAGE_SYSTEM_CONFIG.initTimeout);
}

/**
 * ========================================
 * HANDLER - MUDANÇA DE IDIOMA
 * ========================================
 * 
 * Manipula mudanças de idioma no sistema.
 * Aqui você pode adicionar lógica personalizada
 * que deve ser executada quando o idioma muda.
 * 
 * @param {Object} data - Dados da mudança
 */
async function handleLanguageChange(data) {
    try {
        console.log('🌍 Idioma alterado:', data);

        // Exemplo: Atualizar meta tags do documento
        updateDocumentMetaTags(data.current);

        // Exemplo: Atualizar atributo lang do HTML
        updateDocumentLanguage(data.current);

        // Exemplo: Notificar outros sistemas
        notifyOtherSystems('languageChanged', data);

        // Exemplo: Analytics/Tracking
        trackLanguageChange(data);

    } catch (error) {
        console.error('❌ Erro ao processar mudança de idioma:', error);
    }
}

/**
 * ========================================
 * HANDLER - SISTEMA PRONTO
 * ========================================
 * 
 * Manipula o evento de sistema pronto.
 * Aqui você pode executar ações que dependem
 * do sistema estar completamente inicializado.
 * 
 * @param {Object} data - Dados do sistema
 */
function handleSystemReady(data) {
    console.log('🎉 Sistema de idiomas está pronto!', data);

    // Limpar timeout de segurança
    if (initTimeout) {
        clearTimeout(initTimeout);
        initTimeout = null;
    }

    // Exemplo: Mostrar notificação de sucesso
    showSystemReadyNotification();

    // Exemplo: Configurar outros componentes
    configureOtherComponents(data);

    // Exemplo: Analytics/Tracking
    trackSystemReady(data);
}

/**
 * ========================================
 * HANDLER - ERRO DO SISTEMA
 * ========================================
 * 
 * Manipula erros que ocorrem no sistema.
 * 
 * @param {Error} error - Erro ocorrido
 */
function handleSystemError(error) {
    console.error('❌ Erro no sistema de idiomas:', error);

    // Exemplo: Mostrar notificação de erro
    showErrorMessage('Erro no sistema de idiomas', error.message);

    // Exemplo: Tentar recuperação automática
    attemptSystemRecovery(error);

    // Exemplo: Analytics/Tracking
    trackSystemError(error);
}

/**
 * ========================================
 * HANDLER - ERRO DE INICIALIZAÇÃO
 * ========================================
 * 
 * Manipula erros específicos de inicialização.
 * 
 * @param {Error} error - Erro de inicialização
 */
function handleInitializationError(error) {
    console.error('❌ Erro na inicialização:', error);

    // Limpar timeout se existir
    if (initTimeout) {
        clearTimeout(initTimeout);
        initTimeout = null;
    }

    // Exemplo: Mostrar fallback
    showFallbackLanguageSelector();

    // Exemplo: Notificar administradores
    notifyAdministrators(error);

    // Exemplo: Analytics/Tracking
    trackInitializationError(error);
}

/**
 * ========================================
 * FUNÇÕES AUXILIARES
 * ========================================
 * 
 * Funções auxiliares para funcionalidades
 * específicas do sistema.
 */

/**
 * Atualiza as meta tags do documento
 */
function updateDocumentMetaTags(languageCode) {
    // Atualizar meta tag de idioma
    const metaLang = document.querySelector('meta[name="language"]');
    if (metaLang) {
        metaLang.setAttribute('content', languageCode);
    }

    // Atualizar meta tag de content-language
    const metaContentLang = document.querySelector('meta[http-equiv="content-language"]');
    if (metaContentLang) {
        metaContentLang.setAttribute('content', languageCode);
    }
}

/**
 * Atualiza o atributo lang do elemento HTML
 */
function updateDocumentLanguage(languageCode) {
    document.documentElement.setAttribute('lang', languageCode);
}

/**
 * Notifica outros sistemas sobre mudanças
 */
function notifyOtherSystems(event, data) {
    // Disparar evento customizado
    document.dispatchEvent(new CustomEvent('precisionLanguageChange', {
        detail: { event, data }
    }));
}

/**
 * Mostra notificação de sistema pronto
 */
function showSystemReadyNotification() {
    if (LANGUAGE_SYSTEM_CONFIG.debug) {
        console.log('🎉 Sistema de idiomas carregado e pronto!');
    }
}

/**
 * Configura outros componentes que dependem do sistema
 */
function configureOtherComponents(data) {
    // Exemplo: Configurar componentes que dependem do idioma
    // configureFormValidation(data.currentLanguage);
    // configureDatePicker(data.currentLanguage);
    // configureNumberFormatting(data.currentLanguage);
}

/**
 * Mostra seletor de idiomas de fallback
 */
function showFallbackLanguageSelector() {
    console.log('🔄 Mostrando seletor de fallback...');
    
    // Criar seletor simples de fallback
    const fallbackSelector = document.createElement('div');
    fallbackSelector.className = 'language-fallback';
    fallbackSelector.innerHTML = `
        <select onchange="changeLanguageFallback(this.value)">
            <option value="pt">Português</option>
            <option value="en">English</option>
            <option value="es">Español</option>
        </select>
    `;
    
    // Inserir no container
    const container = document.querySelector(LANGUAGE_SYSTEM_CONFIG.selectorContainer);
    if (container) {
        container.appendChild(fallbackSelector);
    }
}

/**
 * Função de fallback para mudança de idioma
 */
window.changeLanguageFallback = function(languageCode) {
    console.log('🔄 Mudança de idioma via fallback:', languageCode);
    
    // Aplicar traduções básicas
    if (window.Translations && window.Translations[languageCode]) {
        applyBasicTranslations(window.Translations[languageCode]);
    }
    
    // Salvar no localStorage
    localStorage.setItem(LANGUAGE_SYSTEM_CONFIG.storageKey, languageCode);
    
    // Atualizar documento
    updateDocumentLanguage(languageCode);
    updateDocumentMetaTags(languageCode);
};

/**
 * Aplica traduções básicas (fallback)
 */
function applyBasicTranslations(translations) {
    // Aplicar traduções em elementos com data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getNestedTranslation(translations, key);
        if (translation) {
            element.textContent = translation;
        }
    });
}

/**
 * Busca tradução aninhada
 */
function getNestedTranslation(translations, key) {
    if (!key || !translations) return null;
    
    const keys = key.split('.');
    let result = translations;
    
    for (const k of keys) {
        if (result && typeof result === 'object' && k in result) {
            result = result[k];
        } else {
            return null;
        }
    }
    
    return typeof result === 'string' ? result : null;
}

/**
 * ========================================
 * FUNÇÕES DE TRACKING/ANALYTICS
 * ========================================
 * 
 * Funções para rastreamento e analytics.
 * Implemente conforme sua necessidade.
 */

function trackLanguageChange(data) {
    // Exemplo: Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'language_change', {
            'language_code': data.current,
            'previous_language': data.previous
        });
    }
    
    // Exemplo: Outros sistemas de tracking
    // mixpanel.track('Language Changed', data);
    // amplitude.track('Language Changed', data);
}

function trackSystemReady(data) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'language_system_ready', {
            'current_language': data.currentLanguage,
            'available_languages': data.availableLanguages.join(',')
        });
    }
}

function trackSystemError(error) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'language_system_error', {
            'error_message': error.message,
            'error_stack': error.stack
        });
    }
}

function trackInitializationError(error) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'language_system_init_error', {
            'error_message': error.message
        });
    }
}

/**
 * ========================================
 * FUNÇÕES DE NOTIFICAÇÃO
 * ========================================
 * 
 * Funções para notificações e mensagens.
 */

function showErrorMessage(title, message) {
    console.error(`❌ ${title}: ${message}`);
    
    // Exemplo: Mostrar toast/notification
    // showToast('error', title, message);
}

function notifyAdministrators(error) {
    // Exemplo: Enviar erro para sistema de monitoramento
    // Sentry.captureException(error);
    // LogRocket.captureException(error);
}

function attemptSystemRecovery(error) {
    console.log('🔄 Tentando recuperação do sistema...');
    
    // Exemplo: Tentar reinicializar após delay
    setTimeout(() => {
        if (!languageSystem || !languageSystem.isReady) {
            console.log('🔄 Reinicializando sistema...');
            initializeLanguageSystem();
        }
    }, 5000);
}

/**
 * ========================================
 * INICIALIZAÇÃO AUTOMÁTICA
 * ========================================
 * 
 * Inicializa o sistema automaticamente quando
 * a página é carregada.
 */

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLanguageSystem);
} else {
    // DOM já está pronto
    initializeLanguageSystem();
}

// Inicializar também quando a página for totalmente carregada
window.addEventListener('load', () => {
    if (!languageSystem || !languageSystem.isReady) {
        console.log('🔄 Reinicializando após load completo...');
        initializeLanguageSystem();
    }
});

// Exportar função de inicialização para uso manual
window.initializeLanguageSystem = initializeLanguageSystem;

// Exportar instância do sistema para acesso global
window.languageSystem = null; // Será preenchido após inicialização
