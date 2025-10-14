// Sistema de Internacionalização - Precision Solutions
class I18n {
    constructor() {
        this.currentLanguage = this.getStoredLanguage() || 'pt';
        this.translations = {};
        this.init();
    }

    async init() {
        await this.loadTranslations();
        this.applyTranslations();
    }

    // Obter idioma armazenado no localStorage
    getStoredLanguage() {
        return localStorage.getItem('precision-language') || 'pt';
    }

    // Armazenar idioma no localStorage
    setStoredLanguage(lang) {
        localStorage.setItem('precision-language', lang);
    }

    // Carregar traduções
    async loadTranslations() {
        try {
            const response = await fetch(`locales/${this.currentLanguage}/translations.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.translations = await response.json();
            console.log(`✅ Traduções carregadas para: ${this.currentLanguage}`);
            return true;
        } catch (error) {
            console.error('❌ Erro ao carregar traduções:', error);
            // Fallback para português
            if (this.currentLanguage !== 'pt') {
                console.log('🔄 Tentando carregar português como fallback...');
                this.currentLanguage = 'pt';
                return await this.loadTranslations();
            }
            return false;
        }
    }

    // Aplicar traduções ao DOM
    applyTranslations() {
        // Atualizar meta tags
        this.updateMetaTags();
        
        // Atualizar elementos com data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            if (translation) {
                if (element.tagName === 'INPUT' && element.type === 'text') {
                    element.placeholder = translation;
                } else if (element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Atualizar elementos com data-i18n-html
        document.querySelectorAll('[data-i18n-html]').forEach(element => {
            const key = element.getAttribute('data-i18n-html');
            const translation = this.getTranslation(key);
            if (translation) {
                element.innerHTML = translation;
            }
        });

        // Atualizar elementos com data-i18n-attr
        document.querySelectorAll('[data-i18n-attr]').forEach(element => {
            const attrData = element.getAttribute('data-i18n-attr');
            const [attr, key] = attrData.split(':');
            const translation = this.getTranslation(key);
            if (translation) {
                element.setAttribute(attr, translation);
            }
        });

        // Atualizar seletor de idiomas
        this.updateLanguageSelector();
    }

    // Atualizar meta tags
    updateMetaTags() {
        if (this.translations.meta) {
            document.title = this.translations.meta.title;
            
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute('content', this.translations.meta.description);
            }

            const metaKeywords = document.querySelector('meta[name="keywords"]');
            if (metaKeywords) {
                metaKeywords.setAttribute('content', this.translations.meta.keywords);
            }
        }
    }

    // Obter tradução por chave
    getTranslation(key) {
        const keys = key.split('.');
        let translation = this.translations;
        
        for (const k of keys) {
            if (translation && translation[k]) {
                translation = translation[k];
            } else {
                console.warn(`Tradução não encontrada para: ${key}`);
                return key; // Retorna a chave se não encontrar tradução
            }
        }
        
        return translation;
    }

    // Alterar idioma
    async changeLanguage(lang) {
        if (lang === this.currentLanguage) return;
        
        console.log(`🔄 Mudando idioma para: ${lang}`);
        this.currentLanguage = lang;
        this.setStoredLanguage(lang);
        
        const success = await this.loadTranslations();
        if (success) {
            this.applyTranslations();
            console.log(`✅ Idioma alterado para: ${lang}`);
            
            // Disparar evento personalizado
            document.dispatchEvent(new CustomEvent('languageChanged', {
                detail: { language: lang }
            }));
        }
    }

    // Atualizar seletor de idiomas
    updateLanguageSelector() {
        const langToggle = document.querySelector('.lang-toggle');
        if (langToggle) {
            const langMap = {
                'pt': 'PT',
                'en': 'EN',
                'es': 'ES'
            };
            langToggle.textContent = langMap[this.currentLanguage] || 'PT';
        }
    }

    // Obter idioma atual
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    // Obter lista de idiomas disponíveis
    getAvailableLanguages() {
        return [
            { code: 'pt', name: 'Português', flag: '🇧🇷' },
            { code: 'en', name: 'English', flag: '🇺🇸' },
            { code: 'es', name: 'Español', flag: '🇪🇸' }
        ];
    }
}

// Inicializar sistema de internacionalização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando sistema de tradução...');
    window.i18n = new I18n();
    console.log('✅ Sistema de tradução inicializado!');
});
