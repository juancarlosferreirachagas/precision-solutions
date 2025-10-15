// Sistema de Logging Condicional - Precision Solutions
// Remove logs em produção, mantém em desenvolvimento

const isDev = window.location.hostname === 'localhost' || 
              window.location.hostname === '127.0.0.1' || 
              window.location.hostname.includes('vercel.app') && window.location.search.includes('dev');

export const logger = {
    log: (...args) => {
        if (isDev) {
            console.log('[DEV]', ...args);
        }
    },
    error: (...args) => {
        if (isDev) {
            console.error('[ERROR]', ...args);
        }
    },
    warn: (...args) => {
        if (isDev) {
            console.warn('[WARN]', ...args);
        }
    },
    info: (...args) => {
        if (isDev) {
            console.info('[INFO]', ...args);
        }
    }
};

// Para compatibilidade com código existente
window.logger = logger;
