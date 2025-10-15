/**
 * ========================================
 * LANGUAGE SELECTOR - COMPONENTE DE INTERFACE
 * ========================================
 * 
 * Este módulo é responsável pela interface visual do seletor
 * de idiomas. Ele gerencia:
 * - Renderização do HTML do seletor
 * - Estilos CSS dinâmicos
 * - Animações e transições
 * - Responsividade
 * 
 * Princípios aplicados:
 * - Component-Based Architecture
 * - Separation of Concerns
 * - Single Responsibility Principle
 * 
 * @author Precision Solutions
 * @version 2.0.0
 * @since 2024
 */

class LanguageSelector {
    /**
     * ========================================
     * CONSTRUTOR - INICIALIZAÇÃO DO COMPONENTE
     * ========================================
     * 
     * @param {Object} options - Opções de configuração
     * @param {string} options.container - Seletor do container pai
     * @param {Array} options.languages - Array de idiomas disponíveis
     * @param {string} options.currentLanguage - Idioma atual
     * @param {Function} options.onLanguageChange - Callback para mudança de idioma
     */
    constructor(options = {}) {
        // Configurações padrão
        this.config = {
            container: options.container || '.nav-menu',
            languages: options.languages || [
                { code: 'pt', name: 'Português', flag: '🇧🇷' },
                { code: 'en', name: 'English', flag: '🇺🇸' },
                { code: 'es', name: 'Español', flag: '🇪🇸' }
            ],
            currentLanguage: options.currentLanguage || 'pt',
            onLanguageChange: options.onLanguageChange || (() => {}),
            ...options
        };

        // Estado do componente
        this.isOpen = false;
        this.isRendered = false;

        // Elementos DOM
        this.elements = {
            container: null,
            selector: null,
            toggle: null,
            menu: null,
            links: []
        };

        // Bind dos métodos para manter o contexto 'this'
        this.handleToggleClick = this.handleToggleClick.bind(this);
        this.handleLanguageSelect = this.handleLanguageSelect.bind(this);
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    /**
     * ========================================
     * RENDERIZAÇÃO - CRIAÇÃO DO HTML
     * ========================================
     * 
     * Cria e insere o HTML do seletor de idiomas
     * no container especificado.
     * 
     * @returns {boolean} - True se renderizado com sucesso
     */
    render() {
        try {
            console.log('🎨 Renderizando LanguageSelector...');

            // 1. Encontrar o container
            this.elements.container = document.querySelector(this.config.container);
            if (!this.elements.container) {
                throw new Error(`Container não encontrado: ${this.config.container}`);
            }

            // 2. Criar o HTML do seletor
            const selectorHTML = this.createSelectorHTML();

            // 3. Inserir no container
            this.elements.container.insertAdjacentHTML('beforeend', selectorHTML);

            // 4. Encontrar os elementos criados
            this.findRenderedElements();

            // 5. Configurar event listeners
            this.setupEventListeners();

            // 6. Aplicar estilos
            this.applyStyles();

            // 7. Marcar como renderizado
            this.isRendered = true;

            console.log('✅ LanguageSelector renderizado com sucesso!');
            return true;

        } catch (error) {
            console.error('❌ Erro ao renderizar LanguageSelector:', error);
            return false;
        }
    }

    /**
     * ========================================
     * CRIAÇÃO DO HTML DO SELETOR
     * ========================================
     * 
     * Gera o HTML completo do seletor de idiomas
     * com estrutura semântica e acessível.
     * 
     * @returns {string} - HTML do seletor
     */
    createSelectorHTML() {
        // Encontrar o idioma atual
        const currentLang = this.config.languages.find(
            lang => lang.code === this.config.currentLanguage
        ) || this.config.languages[0];

        return `
            <li class="language-switcher" role="menuitem">
                <button 
                    class="lang-toggle" 
                    type="button"
                    aria-label="Selecionar idioma"
                    aria-expanded="false"
                    aria-haspopup="true"
                    data-current-lang="${currentLang.code}"
                >
                    <span class="lang-flag">${currentLang.flag}</span>
                    <span class="lang-code">${currentLang.code.toUpperCase()}</span>
                    <span class="lang-arrow" aria-hidden="true">▼</span>
                </button>
                <ul class="lang-menu" role="menu" aria-label="Menu de idiomas">
                    ${this.config.languages.map(lang => `
                        <li role="none">
                            <button 
                                class="lang-option ${lang.code === this.config.currentLanguage ? 'active' : ''}"
                                type="button"
                                role="menuitem"
                                data-lang="${lang.code}"
                                aria-label="Alterar para ${lang.name}"
                            >
                                <span class="lang-flag">${lang.flag}</span>
                                <span class="lang-name">${lang.name}</span>
                                <span class="lang-code">${lang.code.toUpperCase()}</span>
                            </button>
                        </li>
                    `).join('')}
                </ul>
            </li>
        `;
    }

    /**
     * ========================================
     * BUSCA DE ELEMENTOS RENDERIZADOS
     * ========================================
     * 
     * Encontra todos os elementos DOM criados
     * durante a renderização.
     */
    findRenderedElements() {
        // Buscar o seletor principal
        this.elements.selector = this.elements.container.querySelector('.language-switcher');
        
        if (this.elements.selector) {
            // Buscar o botão toggle
            this.elements.toggle = this.elements.selector.querySelector('.lang-toggle');
            
            // Buscar o menu dropdown
            this.elements.menu = this.elements.selector.querySelector('.lang-menu');
            
            // Buscar todos os botões de idioma
            this.elements.links = this.elements.selector.querySelectorAll('.lang-option');
        }

        console.log('🔍 Elementos renderizados encontrados:', {
            selector: !!this.elements.selector,
            toggle: !!this.elements.toggle,
            menu: !!this.elements.menu,
            links: this.elements.links.length
        });
    }

    /**
     * ========================================
     * CONFIGURAÇÃO DE EVENT LISTENERS
     * ========================================
     * 
     * Configura todos os event listeners necessários
     * para a funcionalidade do seletor.
     */
    setupEventListeners() {
        // Event listener para o botão toggle
        if (this.elements.toggle) {
            this.elements.toggle.addEventListener('click', this.handleToggleClick);
            this.elements.toggle.addEventListener('keydown', this.handleKeyDown);
        }

        // Event listeners para cada opção de idioma
        this.elements.links.forEach(link => {
            link.addEventListener('click', this.handleLanguageSelect);
            link.addEventListener('keydown', this.handleKeyDown);
        });

        // Event listener para fechar ao clicar fora
        document.addEventListener('click', this.handleDocumentClick);

        console.log('🎧 Event listeners configurados');
    }

    /**
     * ========================================
     * APLICAÇÃO DE ESTILOS CSS
     * ========================================
     * 
     * Aplica estilos CSS dinâmicos para o seletor.
     * Os estilos são injetados no <head> da página.
     */
    applyStyles() {
        // Verificar se os estilos já foram aplicados
        if (document.getElementById('language-selector-styles')) {
            return;
        }

        // Criar elemento <style>
        const style = document.createElement('style');
        style.id = 'language-selector-styles';
        style.textContent = this.getCSSStyles();

        // Inserir no <head>
        document.head.appendChild(style);

        console.log('🎨 Estilos CSS aplicados');
    }

    /**
     * ========================================
     * ESTILOS CSS DO SELETOR
     * ========================================
     * 
     * Retorna os estilos CSS completos para o seletor.
     * Os estilos são responsivos e acessíveis.
     * 
     * @returns {string} - CSS do seletor
     */
    getCSSStyles() {
        return `
            /* ========================================
               LANGUAGE SELECTOR - ESTILOS CSS
               ======================================== */
            
            /* Container principal do seletor */
            .language-switcher {
                position: relative;
                display: inline-block;
            }

            /* Botão toggle do seletor */
            .lang-toggle {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.5rem 1rem;
                background: transparent;
                border: 1px solid rgba(30, 64, 175, 0.2);
                border-radius: 6px;
                color: var(--text, #1f2937);
                font-size: 0.9rem;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.3s ease;
                min-height: 44px; /* Touch target mínimo */
            }

            .lang-toggle:hover {
                background: rgba(30, 64, 175, 0.1);
                border-color: rgba(30, 64, 175, 0.3);
                transform: translateY(-1px);
            }

            .lang-toggle:focus {
                outline: 2px solid var(--primary, #1e40af);
                outline-offset: 2px;
            }

            .lang-toggle[aria-expanded="true"] {
                background: rgba(30, 64, 175, 0.1);
                border-color: var(--primary, #1e40af);
            }

            .lang-toggle[aria-expanded="true"] .lang-arrow {
                transform: rotate(180deg);
            }

            /* Elementos do botão toggle */
            .lang-flag {
                font-size: 1.2rem;
                line-height: 1;
            }

            .lang-code {
                font-weight: 600;
                letter-spacing: 0.5px;
            }

            .lang-arrow {
                font-size: 0.7rem;
                transition: transform 0.3s ease;
                color: var(--text-light, #6b7280);
            }

            /* Menu dropdown */
            .lang-menu {
                position: absolute;
                top: 100%;
                right: 0;
                min-width: 200px;
                background: var(--white, #ffffff);
                border: 1px solid rgba(30, 64, 175, 0.2);
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                opacity: 0;
                visibility: hidden;
                transform: translateY(-10px);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                z-index: 1000;
                list-style: none;
                margin: 0;
                padding: 0.5rem 0;
            }

            .lang-menu.active {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }

            /* Opções do menu */
            .lang-option {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                width: 100%;
                padding: 0.75rem 1rem;
                background: transparent;
                border: none;
                color: var(--text, #1f2937);
                font-size: 0.9rem;
                text-align: left;
                cursor: pointer;
                transition: all 0.2s ease;
                min-height: 44px; /* Touch target mínimo */
            }

            .lang-option:hover {
                background: rgba(30, 64, 175, 0.1);
                color: var(--primary, #1e40af);
            }

            .lang-option:focus {
                outline: 2px solid var(--primary, #1e40af);
                outline-offset: -2px;
            }

            .lang-option.active {
                background: rgba(30, 64, 175, 0.1);
                color: var(--primary, #1e40af);
                font-weight: 600;
            }

            .lang-option.active::after {
                content: '✓';
                margin-left: auto;
                color: var(--primary, #1e40af);
                font-weight: bold;
            }

            /* Nome do idioma */
            .lang-name {
                flex: 1;
                font-weight: 500;
            }

            /* Responsividade - Mobile */
            @media (max-width: 767px) {
                .lang-toggle {
                    padding: 0.4rem 0.8rem;
                    font-size: 0.85rem;
                }

                .lang-menu {
                    right: 0;
                    left: auto;
                    min-width: 180px;
                }

                .lang-option {
                    padding: 0.6rem 0.8rem;
                    font-size: 0.85rem;
                }
            }

            /* Responsividade - Tablet */
            @media (min-width: 768px) and (max-width: 1023px) {
                .lang-toggle {
                    padding: 0.45rem 0.9rem;
                }

                .lang-menu {
                    min-width: 190px;
                }
            }

            /* Estados de carregamento */
            .language-switcher.loading .lang-toggle {
                opacity: 0.6;
                cursor: not-allowed;
            }

            .language-switcher.loading .lang-arrow {
                animation: spin 1s linear infinite;
            }

            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }

            /* Acessibilidade - Reduzir movimento */
            @media (prefers-reduced-motion: reduce) {
                .lang-toggle,
                .lang-menu,
                .lang-option,
                .lang-arrow {
                    transition: none;
                }
            }

            /* Modo escuro (se implementado) */
            @media (prefers-color-scheme: dark) {
                .lang-toggle {
                    background: rgba(255, 255, 255, 0.1);
                    border-color: rgba(255, 255, 255, 0.2);
                    color: var(--white, #ffffff);
                }

                .lang-menu {
                    background: var(--bg-dark, #1f2937);
                    border-color: rgba(255, 255, 255, 0.2);
                }

                .lang-option {
                    color: var(--white, #ffffff);
                }

                .lang-option:hover {
                    background: rgba(255, 255, 255, 0.1);
                }
            }
        `;
    }

    /**
     * ========================================
     * HANDLER - CLICK NO TOGGLE
     * ========================================
     * 
     * Manipula o clique no botão toggle do seletor.
     * 
     * @param {Event} event - Evento de clique
     */
    handleToggleClick(event) {
        event.preventDefault();
        event.stopPropagation();
        
        this.toggleMenu();
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
    handleLanguageSelect(event) {
        event.preventDefault();
        
        const selectedLanguage = event.target.getAttribute('data-lang');
        if (selectedLanguage && selectedLanguage !== this.config.currentLanguage) {
            this.selectLanguage(selectedLanguage);
        }
        
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
        if (!this.elements.selector?.contains(event.target)) {
            this.closeMenu();
        }
    }

    /**
     * ========================================
     * HANDLER - NAVEGAÇÃO POR TECLADO
     * ========================================
     * 
     * Implementa navegação por teclado para acessibilidade.
     * 
     * @param {KeyboardEvent} event - Evento de teclado
     */
    handleKeyDown(event) {
        switch (event.key) {
            case 'Enter':
            case ' ':
                event.preventDefault();
                if (event.target === this.elements.toggle) {
                    this.toggleMenu();
                } else {
                    this.handleLanguageSelect(event);
                }
                break;
                
            case 'Escape':
                this.closeMenu();
                this.elements.toggle?.focus();
                break;
                
            case 'ArrowDown':
                if (this.isOpen) {
                    event.preventDefault();
                    this.focusNextOption();
                }
                break;
                
            case 'ArrowUp':
                if (this.isOpen) {
                    event.preventDefault();
                    this.focusPreviousOption();
                }
                break;
        }
    }

    /**
     * ========================================
     * TOGGLE DO MENU
     * ========================================
     * 
     * Abre ou fecha o menu dropdown.
     */
    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    /**
     * ========================================
     * ABERTURA DO MENU
     * ========================================
     * 
     * Abre o menu dropdown e atualiza os atributos ARIA.
     */
    openMenu() {
        if (!this.elements.menu || !this.elements.toggle) return;
        
        this.elements.menu.classList.add('active');
        this.elements.toggle.setAttribute('aria-expanded', 'true');
        this.isOpen = true;
        
        // Focar na primeira opção
        const firstOption = this.elements.links[0];
        if (firstOption) {
            firstOption.focus();
        }
        
        console.log('📂 Menu de idiomas aberto');
    }

    /**
     * ========================================
     * FECHAMENTO DO MENU
     * ========================================
     * 
     * Fecha o menu dropdown e atualiza os atributos ARIA.
     */
    closeMenu() {
        if (!this.elements.menu || !this.elements.toggle) return;
        
        this.elements.menu.classList.remove('active');
        this.elements.toggle.setAttribute('aria-expanded', 'false');
        this.isOpen = false;
        
        console.log('📁 Menu de idiomas fechado');
    }

    /**
     * ========================================
     * SELEÇÃO DE IDIOMA
     * ========================================
     * 
     * Seleciona um idioma específico e atualiza a interface.
     * 
     * @param {string} languageCode - Código do idioma
     */
    selectLanguage(languageCode) {
        const selectedLang = this.config.languages.find(
            lang => lang.code === languageCode
        );
        
        if (!selectedLang) {
            console.warn('⚠️ Idioma não encontrado:', languageCode);
            return;
        }
        
        console.log('🌍 Selecionando idioma:', selectedLang.name);
        
        // Atualizar configuração
        this.config.currentLanguage = languageCode;
        
        // Atualizar interface
        this.updateInterface(selectedLang);
        
        // Chamar callback
        this.config.onLanguageChange(languageCode, selectedLang);
    }

    /**
     * ========================================
     * ATUALIZAÇÃO DA INTERFACE
     * ========================================
     * 
     * Atualiza a interface visual do seletor.
     * 
     * @param {Object} selectedLang - Objeto do idioma selecionado
     */
    updateInterface(selectedLang) {
        if (!this.elements.toggle) return;
        
        // Atualizar botão toggle
        const flag = this.elements.toggle.querySelector('.lang-flag');
        const code = this.elements.toggle.querySelector('.lang-code');
        
        if (flag) flag.textContent = selectedLang.flag;
        if (code) code.textContent = selectedLang.code.toUpperCase();
        
        this.elements.toggle.setAttribute('data-current-lang', selectedLang.code);
        
        // Atualizar estado ativo das opções
        this.elements.links.forEach(link => {
            const linkLang = link.getAttribute('data-lang');
            if (linkLang === selectedLang.code) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    /**
     * ========================================
     * FOCO NA PRÓXIMA OPÇÃO
     * ========================================
     * 
     * Move o foco para a próxima opção do menu.
     */
    focusNextOption() {
        const currentIndex = Array.from(this.elements.links).indexOf(document.activeElement);
        const nextIndex = (currentIndex + 1) % this.elements.links.length;
        this.elements.links[nextIndex]?.focus();
    }

    /**
     * ========================================
     * FOCO NA OPÇÃO ANTERIOR
     * ========================================
     * 
     * Move o foco para a opção anterior do menu.
     */
    focusPreviousOption() {
        const currentIndex = Array.from(this.elements.links).indexOf(document.activeElement);
        const prevIndex = currentIndex <= 0 ? this.elements.links.length - 1 : currentIndex - 1;
        this.elements.links[prevIndex]?.focus();
    }

    /**
     * ========================================
     * ATUALIZAÇÃO DO IDIOMA ATUAL
     * ========================================
     * 
     * Atualiza o idioma atual do seletor.
     * 
     * @param {string} languageCode - Código do idioma
     */
    updateCurrentLanguage(languageCode) {
        this.config.currentLanguage = languageCode;
        
        if (this.isRendered) {
            const selectedLang = this.config.languages.find(
                lang => lang.code === languageCode
            );
            
            if (selectedLang) {
                this.updateInterface(selectedLang);
            }
        }
    }

    /**
     * ========================================
     * DESTRUIÇÃO DO COMPONENTE
     * ========================================
     * 
     * Remove o componente e limpa todas as referências.
     */
    destroy() {
        // Remover event listeners
        if (this.elements.toggle) {
            this.elements.toggle.removeEventListener('click', this.handleToggleClick);
            this.elements.toggle.removeEventListener('keydown', this.handleKeyDown);
        }

        this.elements.links.forEach(link => {
            link.removeEventListener('click', this.handleLanguageSelect);
            link.removeEventListener('keydown', this.handleKeyDown);
        });

        document.removeEventListener('click', this.handleDocumentClick);

        // Remover HTML do seletor
        if (this.elements.selector) {
            this.elements.selector.remove();
        }

        // Remover estilos CSS
        const styles = document.getElementById('language-selector-styles');
        if (styles) {
            styles.remove();
        }

        // Limpar referências
        this.elements = {
            container: null,
            selector: null,
            toggle: null,
            menu: null,
            links: []
        };

        this.isRendered = false;
        this.isOpen = false;
        
        console.log('🗑️ LanguageSelector destruído');
    }
}

// Exportar a classe
window.LanguageSelector = LanguageSelector;
