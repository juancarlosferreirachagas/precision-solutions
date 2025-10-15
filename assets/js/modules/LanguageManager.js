/**
 * ========================================
 * LANGUAGE MANAGER - GERENCIADOR DE IDIOMAS
 * ========================================
 * 
 * Este módulo é responsável por gerenciar toda a funcionalidade
 * de mudança de idiomas do site. Ele segue os princípios de:
 * - Single Responsibility Principle (SRP)
 * - Clean Code
 * - Separation of Concerns
 * 
 * @author Precision Solutions
 * @version 2.0.0
 * @since 2024
 */

class LanguageManager {
    /**
     * ========================================
     * CONSTRUTOR - INICIALIZAÇÃO DA CLASSE
     * ========================================
     * 
     * O construtor é onde definimos as propriedades iniciais
     * e configurações padrão da classe.
     * 
     * @param {Object} options - Opções de configuração
     * @param {string} options.defaultLanguage - Idioma padrão (pt, en, es)
     * @param {string} options.storageKey - Chave para localStorage
     * @param {Object} options.translations - Objeto com todas as traduções
     */
    constructor(options = {}) {
        // Configurações padrão usando destructuring com valores padrão
        this.config = {
            defaultLanguage: options.defaultLanguage || 'pt',
            storageKey: options.storageKey || 'precision-language',
            translations: options.translations || {},
            ...options // Spread operator para sobrescrever configurações
        };

        // Estado atual do gerenciador
        this.currentLanguage = this.getStoredLanguage();
        this.isInitialized = false;

        // Elementos DOM que serão gerenciados
        this.elements = {
            switcher: null,
            toggle: null,
            menu: null,
            links: []
        };

        // Callbacks para eventos personalizados
        this.callbacks = {
            onLanguageChange: [],
            onInitialized: []
        };

        // Bind dos métodos para manter o contexto 'this'
        this.handleToggleClick = this.handleToggleClick.bind(this);
        this.handleLanguageSelect = this.handleLanguageSelect.bind(this);
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
    }

    /**
     * ========================================
     * INICIALIZAÇÃO - SETUP DO COMPONENTE
     * ========================================
     * 
     * Este método é responsável por:
     * 1. Encontrar os elementos DOM necessários
     * 2. Configurar event listeners
     * 3. Aplicar o idioma atual
     * 4. Notificar que a inicialização foi concluída
     * 
     * @returns {Promise<boolean>} - True se inicializado com sucesso
     */
    async init() {
        try {
            console.log('🚀 Inicializando LanguageManager...');

            // 1. Encontrar elementos DOM
            this.findElements();
            
            // 2. Validar se todos os elementos foram encontrados
            if (!this.validateElements()) {
                throw new Error('Elementos DOM necessários não encontrados');
            }

            // 3. Configurar event listeners
            this.setupEventListeners();

            // 4. Aplicar idioma atual
            await this.applyCurrentLanguage();

            // 5. Marcar como inicializado
            this.isInitialized = true;

            // 6. Notificar callbacks de inicialização
            this.notifyCallbacks('onInitialized', { language: this.currentLanguage });

            console.log('✅ LanguageManager inicializado com sucesso!');
            return true;

        } catch (error) {
            console.error('❌ Erro ao inicializar LanguageManager:', error);
            return false;
        }
    }

    /**
     * ========================================
     * BUSCA DE ELEMENTOS DOM
     * ========================================
     * 
     * Este método encontra todos os elementos DOM necessários
     * para o funcionamento do seletor de idiomas.
     * 
     * Usamos querySelector para encontrar elementos específicos
     * e armazenamos referências para evitar buscas repetidas.
     */
    findElements() {
        // Buscar o container principal do seletor de idiomas
        this.elements.switcher = document.querySelector('.language-switcher');
        
        if (this.elements.switcher) {
            // Buscar o botão toggle dentro do switcher
            this.elements.toggle = this.elements.switcher.querySelector('.lang-toggle');
            
            // Buscar o menu dropdown dentro do switcher
            this.elements.menu = this.elements.switcher.querySelector('.lang-menu');
            
            // Buscar todos os links de idiomas
            this.elements.links = this.elements.menu?.querySelectorAll('a[data-lang]') || [];
        }

        console.log('🔍 Elementos encontrados:', {
            switcher: !!this.elements.switcher,
            toggle: !!this.elements.toggle,
            menu: !!this.elements.menu,
            links: this.elements.links.length
        });
    }

    /**
     * ========================================
     * VALIDAÇÃO DE ELEMENTOS
     * ========================================
     * 
     * Verifica se todos os elementos DOM necessários
     * foram encontrados corretamente.
     * 
     * @returns {boolean} - True se todos os elementos estão presentes
     */
    validateElements() {
        const required = ['switcher', 'toggle', 'menu'];
        const missing = required.filter(key => !this.elements[key]);
        
        if (missing.length > 0) {
            console.warn('⚠️ Elementos DOM ausentes:', missing);
            return false;
        }
        
        return true;
    }

    /**
     * ========================================
     * CONFIGURAÇÃO DE EVENT LISTENERS
     * ========================================
     * 
     * Configura todos os event listeners necessários:
     * - Click no toggle para abrir/fechar menu
     * - Click nos links de idioma para selecionar
     * - Click fora do menu para fechar
     * 
     * Usamos addEventListener para permitir múltiplos listeners
     * e facilitar a remoção posterior se necessário.
     */
    setupEventListeners() {
        // Event listener para o botão toggle
        if (this.elements.toggle) {
            this.elements.toggle.addEventListener('click', this.handleToggleClick);
        }

        // Event listeners para cada link de idioma
        this.elements.links.forEach(link => {
            link.addEventListener('click', this.handleLanguageSelect);
        });

        // Event listener para fechar menu ao clicar fora
        document.addEventListener('click', this.handleDocumentClick);

        console.log('🎧 Event listeners configurados');
    }

    /**
     * ========================================
     * HANDLER - CLICK NO TOGGLE
     * ========================================
     * 
     * Manipula o clique no botão toggle do seletor de idiomas.
     * 
     * @param {Event} event - Evento de clique
     */
    handleToggleClick(event) {
        // Prevenir comportamento padrão do link
        event.preventDefault();
        
        // Parar propagação para evitar fechamento imediato
        event.stopPropagation();
        
        // Toggle da classe 'active' no menu
        this.elements.menu.classList.toggle('active');
        
        console.log('🔄 Menu de idiomas toggled');
    }

    /**
     * ========================================
     * HANDLER - SELEÇÃO DE IDIOMA
     * ========================================
     * 
     * Manipula a seleção de um idioma específico.
     * 
     * @param {Event} event - Evento de clique
     */
    async handleLanguageSelect(event) {
        // Prevenir comportamento padrão do link
        event.preventDefault();
        
        // Obter o idioma selecionado do atributo data-lang
        const selectedLanguage = event.target.getAttribute('data-lang');
        
        if (!selectedLanguage) {
            console.warn('⚠️ Idioma não especificado no link');
            return;
        }

        // Verificar se é um idioma válido
        if (!this.isValidLanguage(selectedLanguage)) {
            console.warn('⚠️ Idioma inválido:', selectedLanguage);
            return;
        }

        // Mudar para o idioma selecionado
        await this.changeLanguage(selectedLanguage);
        
        // Fechar o menu
        this.closeMenu();
    }

    /**
     * ========================================
     * HANDLER - CLICK FORA DO MENU
     * ========================================
     * 
     * Fecha o menu quando o usuário clica fora dele.
     * 
     * @param {Event} event - Evento de clique
     */
    handleDocumentClick(event) {
        // Verificar se o clique foi fora do switcher
        if (!this.elements.switcher.contains(event.target)) {
            this.closeMenu();
        }
    }

    /**
     * ========================================
     * MUDANÇA DE IDIOMA
     * ========================================
     * 
     * Método principal para mudar o idioma do site.
     * 
     * @param {string} language - Código do idioma (pt, en, es)
     * @returns {Promise<boolean>} - True se mudança foi bem-sucedida
     */
    async changeLanguage(language) {
        try {
            // Verificar se o idioma é válido
            if (!this.isValidLanguage(language)) {
                throw new Error(`Idioma inválido: ${language}`);
            }

            // Verificar se já está no idioma selecionado
            if (language === this.currentLanguage) {
                console.log('ℹ️ Já está no idioma selecionado');
                return true;
            }

            console.log(`🔄 Mudando idioma de ${this.currentLanguage} para ${language}`);

            // Atualizar idioma atual
            const previousLanguage = this.currentLanguage;
            this.currentLanguage = language;

            // Salvar no localStorage
            this.saveLanguageToStorage(language);

            // Aplicar traduções
            await this.applyTranslations();

            // Atualizar interface do seletor
            this.updateLanguageSelector();

            // Notificar callbacks
            this.notifyCallbacks('onLanguageChange', {
                previous: previousLanguage,
                current: language
            });

            console.log(`✅ Idioma alterado para: ${language}`);
            return true;

        } catch (error) {
            console.error('❌ Erro ao mudar idioma:', error);
            return false;
        }
    }

    /**
     * ========================================
     * APLICAÇÃO DE TRADUÇÕES
     * ========================================
     * 
     * Aplica as traduções do idioma atual em todos os elementos
     * que possuem atributos de internacionalização.
     */
    async applyTranslations() {
        const translations = this.config.translations[this.currentLanguage];
        
        if (!translations) {
            console.warn('⚠️ Traduções não encontradas para:', this.currentLanguage);
            return;
        }

        // Aplicar traduções em elementos com data-i18n
        this.applyTextTranslations(translations);
        
        // Aplicar traduções em elementos com data-i18n-html
        this.applyHtmlTranslations(translations);
        
        // Aplicar traduções em atributos com data-i18n-attr
        this.applyAttributeTranslations(translations);

        console.log('🌍 Traduções aplicadas para:', this.currentLanguage);
    }

    /**
     * ========================================
     * APLICAÇÃO DE TRADUÇÕES DE TEXTO
     * ========================================
     * 
     * Aplica traduções em elementos que usam data-i18n
     * para substituir o texto do elemento.
     * 
     * @param {Object} translations - Objeto com as traduções
     */
    applyTextTranslations(translations) {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getNestedTranslation(translations, key);
            
            if (translation) {
                // Para inputs, usar value; para outros elementos, usar textContent
                if (element.tagName === 'INPUT' && element.type === 'text') {
                    element.value = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
    }

    /**
     * ========================================
     * APLICAÇÃO DE TRADUÇÕES HTML
     * ========================================
     * 
     * Aplica traduções em elementos que usam data-i18n-html
     * para substituir o HTML interno do elemento.
     * 
     * @param {Object} translations - Objeto com as traduções
     */
    applyHtmlTranslations(translations) {
        document.querySelectorAll('[data-i18n-html]').forEach(element => {
            const key = element.getAttribute('data-i18n-html');
            const translation = this.getNestedTranslation(translations, key);
            
            if (translation) {
                element.innerHTML = translation;
            }
        });
    }

    /**
     * ========================================
     * APLICAÇÃO DE TRADUÇÕES DE ATRIBUTOS
     * ========================================
     * 
     * Aplica traduções em atributos de elementos que usam
     * data-i18n-attr no formato "atributo:chave".
     * 
     * @param {Object} translations - Objeto com as traduções
     */
    applyAttributeTranslations(translations) {
        document.querySelectorAll('[data-i18n-attr]').forEach(element => {
            const attrData = element.getAttribute('data-i18n-attr');
            const [attribute, key] = attrData.split(':');
            const translation = this.getNestedTranslation(translations, key);
            
            if (translation && attribute) {
                element.setAttribute(attribute, translation);
            }
        });
    }

    /**
     * ========================================
     * BUSCA DE TRADUÇÃO ANINHADA
     * ========================================
     * 
     * Busca uma tradução usando notação de ponto para
     * acessar propriedades aninhadas do objeto de traduções.
     * 
     * Exemplo: "navigation.home" -> translations.navigation.home
     * 
     * @param {Object} translations - Objeto com as traduções
     * @param {string} key - Chave da tradução (pode ser aninhada)
     * @returns {string|null} - Tradução encontrada ou null
     */
    getNestedTranslation(translations, key) {
        if (!key || !translations) return null;
        
        // Dividir a chave por pontos para navegar no objeto
        const keys = key.split('.');
        let result = translations;
        
        // Navegar pelas propriedades aninhadas
        for (const k of keys) {
            if (result && typeof result === 'object' && k in result) {
                result = result[k];
            } else {
                return null; // Chave não encontrada
            }
        }
        
        return typeof result === 'string' ? result : null;
    }

    /**
     * ========================================
     * ATUALIZAÇÃO DO SELETOR DE IDIOMAS
     * ========================================
     * 
     * Atualiza a interface do seletor de idiomas para
     * refletir o idioma atual selecionado.
     */
    updateLanguageSelector() {
        if (!this.elements.toggle) return;
        
        // Mapear códigos de idioma para exibição
        const languageMap = {
            'pt': 'PT',
            'en': 'EN',
            'es': 'ES'
        };
        
        // Atualizar texto do toggle
        this.elements.toggle.textContent = languageMap[this.currentLanguage] || 'PT';
        
        // Atualizar estado ativo dos links
        this.elements.links.forEach(link => {
            const linkLanguage = link.getAttribute('data-lang');
            if (linkLanguage === this.currentLanguage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    /**
     * ========================================
     * FECHAMENTO DO MENU
     * ========================================
     * 
     * Fecha o menu dropdown do seletor de idiomas.
     */
    closeMenu() {
        if (this.elements.menu) {
            this.elements.menu.classList.remove('active');
        }
    }

    /**
     * ========================================
     * APLICAÇÃO DO IDIOMA ATUAL
     * ========================================
     * 
     * Aplica o idioma atual ao carregar a página.
     */
    async applyCurrentLanguage() {
        await this.applyTranslations();
        this.updateLanguageSelector();
    }

    /**
     * ========================================
     * VALIDAÇÃO DE IDIOMA
     * ========================================
     * 
     * Verifica se um idioma é válido (existe nas traduções).
     * 
     * @param {string} language - Código do idioma
     * @returns {boolean} - True se o idioma é válido
     */
    isValidLanguage(language) {
        return language && this.config.translations.hasOwnProperty(language);
    }

    /**
     * ========================================
     * OBTENÇÃO DO IDIOMA ARMAZENADO
     * ========================================
     * 
     * Obtém o idioma salvo no localStorage ou retorna
     * o idioma padrão se não houver nenhum salvo.
     * 
     * @returns {string} - Código do idioma
     */
    getStoredLanguage() {
        try {
            const stored = localStorage.getItem(this.config.storageKey);
            return stored && this.isValidLanguage(stored) ? stored : this.config.defaultLanguage;
        } catch (error) {
            console.warn('⚠️ Erro ao acessar localStorage:', error);
            return this.config.defaultLanguage;
        }
    }

    /**
     * ========================================
     * SALVAMENTO NO LOCALSTORAGE
     * ========================================
     * 
     * Salva o idioma atual no localStorage para
     * persistir a preferência do usuário.
     * 
     * @param {string} language - Código do idioma
     */
    saveLanguageToStorage(language) {
        try {
            localStorage.setItem(this.config.storageKey, language);
        } catch (error) {
            console.warn('⚠️ Erro ao salvar no localStorage:', error);
        }
    }

    /**
     * ========================================
     * REGISTRO DE CALLBACKS
     * ========================================
     * 
     * Permite registrar callbacks para eventos específicos.
     * 
     * @param {string} event - Nome do evento
     * @param {Function} callback - Função callback
     */
    on(event, callback) {
        if (this.callbacks[event]) {
            this.callbacks[event].push(callback);
        }
    }

    /**
     * ========================================
     * NOTIFICAÇÃO DE CALLBACKS
     * ========================================
     * 
     * Executa todos os callbacks registrados para um evento.
     * 
     * @param {string} event - Nome do evento
     * @param {Object} data - Dados para passar aos callbacks
     */
    notifyCallbacks(event, data) {
        if (this.callbacks[event]) {
            this.callbacks[event].forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`❌ Erro no callback ${event}:`, error);
                }
            });
        }
    }

    /**
     * ========================================
     * DESTRUIÇÃO DO COMPONENTE
     * ========================================
     * 
     * Remove todos os event listeners e limpa
     * as referências para evitar memory leaks.
     */
    destroy() {
        // Remover event listeners
        if (this.elements.toggle) {
            this.elements.toggle.removeEventListener('click', this.handleToggleClick);
        }

        this.elements.links.forEach(link => {
            link.removeEventListener('click', this.handleLanguageSelect);
        });

        document.removeEventListener('click', this.handleDocumentClick);

        // Limpar referências
        this.elements = {
            switcher: null,
            toggle: null,
            menu: null,
            links: []
        };

        this.isInitialized = false;
        
        console.log('🗑️ LanguageManager destruído');
    }
}

// Exportar a classe para uso em outros módulos
// Em um ambiente com módulos ES6, usaríamos: export default LanguageManager;
// Para compatibilidade, vamos adicionar ao objeto window
window.LanguageManager = LanguageManager;
