/**
 * ========================================
 * LANGUAGE SYSTEM - SISTEMA PRINCIPAL
 * ========================================
 * 
 * Este é o módulo principal que orquestra todo o sistema
 * de idiomas. Ele coordena:
 * - LanguageManager (gerenciamento de idiomas)
 * - LanguageSelector (interface visual)
 * - Translations (dados de tradução)
 * 
 * Princípios aplicados:
 * - Facade Pattern (interface simplificada)
 * - Dependency Injection
 * - Event-Driven Architecture
 * - Error Handling
 * 
 * @author Precision Solutions
 * @version 2.0.0
 * @since 2024
 */

class LanguageSystem {
    /**
     * ========================================
     * CONSTRUTOR - INICIALIZAÇÃO DO SISTEMA
     * ========================================
     * 
     * @param {Object} options - Opções de configuração
     */
    constructor(options = {}) {
        // Configurações do sistema
        this.config = {
            // Idioma padrão
            defaultLanguage: options.defaultLanguage || 'pt',
            
            // Chave para localStorage
            storageKey: options.storageKey || 'precision-language',
            
            // Container do seletor
            selectorContainer: options.selectorContainer || '.nav-menu',
            
            // Idiomas disponíveis
            availableLanguages: options.availableLanguages || ['pt', 'en', 'es'],
            
            // Configurações de debug
            debug: options.debug || false,
            
            // Callbacks personalizados
            onLanguageChange: options.onLanguageChange || null,
            onSystemReady: options.onSystemReady || null,
            onError: options.onError || null,
            
            ...options
        };

        // Estado do sistema
        this.isInitialized = false;
        this.isReady = false;
        this.currentLanguage = this.config.defaultLanguage;

        // Componentes do sistema
        this.components = {
            manager: null,
            selector: null,
            translations: null
        };

        // Event listeners personalizados
        this.eventListeners = new Map();

        // Bind dos métodos
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
        this.handleSystemError = this.handleSystemError.bind(this);
    }

    /**
     * ========================================
     * INICIALIZAÇÃO DO SISTEMA
     * ========================================
     * 
     * Inicializa todos os componentes do sistema de idiomas
     * em ordem correta e com tratamento de erros.
     * 
     * @returns {Promise<boolean>} - True se inicializado com sucesso
     */
    async init() {
        try {
            console.log('🚀 Inicializando LanguageSystem...');

            // 1. Verificar dependências
            this.validateDependencies();

            // 2. Inicializar gerenciador de idiomas
            await this.initializeManager();

            // 3. Inicializar seletor de idiomas
            await this.initializeSelector();

            // 4. Configurar event listeners
            this.setupEventListeners();

            // 5. Aplicar idioma atual
            await this.applyCurrentLanguage();

            // 6. Marcar como inicializado
            this.isInitialized = true;
            this.isReady = true;

            // 7. Notificar que o sistema está pronto
            this.notifySystemReady();

            console.log('✅ LanguageSystem inicializado com sucesso!');
            return true;

        } catch (error) {
            this.handleSystemError(error);
            return false;
        }
    }

    /**
     * ========================================
     * VALIDAÇÃO DE DEPENDÊNCIAS
     * ========================================
     * 
     * Verifica se todas as dependências necessárias
     * estão disponíveis.
     */
    validateDependencies() {
        const dependencies = [
            { name: 'LanguageManager', obj: window.LanguageManager },
            { name: 'LanguageSelector', obj: window.LanguageSelector },
            { name: 'Translations', obj: window.Translations }
        ];

        const missing = dependencies.filter(dep => !dep.obj);
        
        if (missing.length > 0) {
            throw new Error(`Dependências ausentes: ${missing.map(d => d.name).join(', ')}`);
        }

        console.log('✅ Todas as dependências estão disponíveis');
    }

    /**
     * ========================================
     * INICIALIZAÇÃO DO GERENCIADOR
     * ========================================
     * 
     * Cria e inicializa o LanguageManager com as
     * configurações apropriadas.
     */
    async initializeManager() {
        console.log('🔧 Inicializando LanguageManager...');

        // Criar instância do gerenciador
        this.components.manager = new LanguageManager({
            defaultLanguage: this.config.defaultLanguage,
            storageKey: this.config.storageKey,
            translations: window.Translations,
            debug: this.config.debug
        });

        // Inicializar o gerenciador
        const success = await this.components.manager.init();
        
        if (!success) {
            throw new Error('Falha ao inicializar LanguageManager');
        }

        // Obter idioma atual
        this.currentLanguage = this.components.manager.currentLanguage;

        console.log('✅ LanguageManager inicializado');
    }

    /**
     * ========================================
     * INICIALIZAÇÃO DO SELETOR
     * ========================================
     * 
     * Cria e inicializa o LanguageSelector com as
     * configurações apropriadas.
     */
    async initializeSelector() {
        console.log('🎨 Inicializando LanguageSelector...');

        // Preparar idiomas para o seletor
        const languages = this.prepareLanguagesForSelector();

        // Criar instância do seletor
        this.components.selector = new LanguageSelector({
            container: this.config.selectorContainer,
            languages: languages,
            currentLanguage: this.currentLanguage,
            onLanguageChange: this.handleLanguageChange
        });

        // Renderizar o seletor
        const success = this.components.selector.render();
        
        if (!success) {
            throw new Error('Falha ao renderizar LanguageSelector');
        }

        console.log('✅ LanguageSelector inicializado');
    }

    /**
     * ========================================
     * PREPARAÇÃO DE IDIOMAS PARA O SELETOR
     * ========================================
     * 
     * Converte os códigos de idioma em objetos
     * completos com nomes e bandeiras.
     * 
     * @returns {Array} - Array de objetos de idiomas
     */
    prepareLanguagesForSelector() {
        const languageMap = {
            'pt': { name: 'Português', flag: '🇧🇷' },
            'en': { name: 'English', flag: '🇺🇸' },
            'es': { name: 'Español', flag: '🇪🇸' }
        };

        return this.config.availableLanguages.map(code => ({
            code: code,
            name: languageMap[code]?.name || code.toUpperCase(),
            flag: languageMap[code]?.flag || '🌐'
        }));
    }

    /**
     * ========================================
     * CONFIGURAÇÃO DE EVENT LISTENERS
     * ========================================
     * 
     * Configura todos os event listeners do sistema.
     */
    setupEventListeners() {
        // Event listener para mudança de idioma
        if (this.components.manager) {
            this.components.manager.on('onLanguageChange', this.handleLanguageChange);
        }

        // Event listener para erros do sistema
        window.addEventListener('error', this.handleSystemError);

        console.log('🎧 Event listeners configurados');
    }

    /**
     * ========================================
     * HANDLER - MUDANÇA DE IDIOMA
     * ========================================
     * 
     * Manipula mudanças de idioma em todo o sistema.
     * 
     * @param {Object} data - Dados da mudança
     */
    async handleLanguageChange(data) {
        try {
            console.log('🌍 Mudança de idioma detectada:', data);

            // Atualizar idioma atual
            this.currentLanguage = data.current;

            // Atualizar seletor se necessário
            if (this.components.selector) {
                this.components.selector.updateCurrentLanguage(data.current);
            }

            // Chamar callback personalizado se fornecido
            if (this.config.onLanguageChange) {
                await this.config.onLanguageChange(data);
            }

            // Notificar listeners personalizados
            this.notifyListeners('languageChange', data);

            console.log('✅ Mudança de idioma processada');

        } catch (error) {
            this.handleSystemError(error);
        }
    }

    /**
     * ========================================
     * HANDLER - ERROS DO SISTEMA
     * ========================================
     * 
     * Manipula erros que ocorrem no sistema.
     * 
     * @param {Error} error - Erro ocorrido
     */
    handleSystemError(error) {
        console.error('❌ Erro no LanguageSystem:', error);

        // Chamar callback de erro se fornecido
        if (this.config.onError) {
            this.config.onError(error);
        }

        // Notificar listeners de erro
        this.notifyListeners('error', { error: error.message });
    }

    /**
     * ========================================
     * APLICAÇÃO DO IDIOMA ATUAL
     * ========================================
     * 
     * Aplica o idioma atual em todo o sistema.
     */
    async applyCurrentLanguage() {
        if (this.components.manager) {
            await this.components.manager.applyCurrentLanguage();
        }
    }

    /**
     * ========================================
     * MUDANÇA DE IDIOMA
     * ========================================
     * 
     * Método público para mudar o idioma do sistema.
     * 
     * @param {string} languageCode - Código do idioma
     * @returns {Promise<boolean>} - True se mudança foi bem-sucedida
     */
    async changeLanguage(languageCode) {
        if (!this.isReady) {
            console.warn('⚠️ Sistema não está pronto');
            return false;
        }

        if (this.components.manager) {
            return await this.components.manager.changeLanguage(languageCode);
        }

        return false;
    }

    /**
     * ========================================
     * OBTENÇÃO DO IDIOMA ATUAL
     * ========================================
     * 
     * Retorna o idioma atual do sistema.
     * 
     * @returns {string} - Código do idioma atual
     */
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    /**
     * ========================================
     * OBTENÇÃO DE IDIOMAS DISPONÍVEIS
     * ========================================
     * 
     * Retorna a lista de idiomas disponíveis.
     * 
     * @returns {Array} - Array de códigos de idiomas
     */
    getAvailableLanguages() {
        return [...this.config.availableLanguages];
    }

    /**
     * ========================================
     * VERIFICAÇÃO DE IDIOMA VÁLIDO
     * ========================================
     * 
     * Verifica se um idioma é válido.
     * 
     * @param {string} languageCode - Código do idioma
     * @returns {boolean} - True se o idioma é válido
     */
    isValidLanguage(languageCode) {
        return this.config.availableLanguages.includes(languageCode);
    }

    /**
     * ========================================
     * REGISTRO DE EVENT LISTENERS
     * ========================================
     * 
     * Permite registrar listeners para eventos
     * personalizados do sistema.
     * 
     * @param {string} event - Nome do evento
     * @param {Function} listener - Função listener
     */
    addEventListener(event, listener) {
        if (!this.eventListeners.has(event)) {
            this.eventListeners.set(event, []);
        }
        this.eventListeners.get(event).push(listener);
    }

    /**
     * ========================================
     * REMOÇÃO DE EVENT LISTENERS
     * ========================================
     * 
     * Remove um listener específico.
     * 
     * @param {string} event - Nome do evento
     * @param {Function} listener - Função listener
     */
    removeEventListener(event, listener) {
        if (this.eventListeners.has(event)) {
            const listeners = this.eventListeners.get(event);
            const index = listeners.indexOf(listener);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        }
    }

    /**
     * ========================================
     * NOTIFICAÇÃO DE LISTENERS
     * ========================================
     * 
     * Notifica todos os listeners de um evento.
     * 
     * @param {string} event - Nome do evento
     * @param {Object} data - Dados do evento
     */
    notifyListeners(event, data) {
        if (this.eventListeners.has(event)) {
            this.eventListeners.get(event).forEach(listener => {
                try {
                    listener(data);
                } catch (error) {
                    console.error(`❌ Erro no listener ${event}:`, error);
                }
            });
        }
    }

    /**
     * ========================================
     * NOTIFICAÇÃO DE SISTEMA PRONTO
     * ========================================
     * 
     * Notifica que o sistema está pronto para uso.
     */
    notifySystemReady() {
        const data = {
            currentLanguage: this.currentLanguage,
            availableLanguages: this.getAvailableLanguages(),
            system: this
        };

        // Chamar callback personalizado se fornecido
        if (this.config.onSystemReady) {
            this.config.onSystemReady(data);
        }

        // Notificar listeners
        this.notifyListeners('systemReady', data);

        // Disparar evento customizado no DOM
        document.dispatchEvent(new CustomEvent('languageSystemReady', {
            detail: data
        }));
    }

    /**
     * ========================================
     * OBTENÇÃO DE INFORMAÇÕES DO SISTEMA
     * ========================================
     * 
     * Retorna informações completas sobre o sistema.
     * 
     * @returns {Object} - Informações do sistema
     */
    getSystemInfo() {
        return {
            isInitialized: this.isInitialized,
            isReady: this.isReady,
            currentLanguage: this.currentLanguage,
            availableLanguages: this.getAvailableLanguages(),
            components: {
                manager: !!this.components.manager,
                selector: !!this.components.selector,
                translations: !!this.components.translations
            },
            config: {
                defaultLanguage: this.config.defaultLanguage,
                storageKey: this.config.storageKey,
                debug: this.config.debug
            }
        };
    }

    /**
     * ========================================
     * DESTRUIÇÃO DO SISTEMA
     * ========================================
     * 
     * Destrói todos os componentes e limpa
     * as referências do sistema.
     */
    destroy() {
        console.log('🗑️ Destruindo LanguageSystem...');

        // Destruir componentes
        if (this.components.manager) {
            this.components.manager.destroy();
        }

        if (this.components.selector) {
            this.components.selector.destroy();
        }

        // Remover event listeners
        window.removeEventListener('error', this.handleSystemError);
        this.eventListeners.clear();

        // Limpar referências
        this.components = {
            manager: null,
            selector: null,
            translations: null
        };

        // Resetar estado
        this.isInitialized = false;
        this.isReady = false;
        this.currentLanguage = this.config.defaultLanguage;

        console.log('✅ LanguageSystem destruído');
    }
}

// Exportar a classe
window.LanguageSystem = LanguageSystem;
