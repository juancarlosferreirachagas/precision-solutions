// Menu hambúrguer simples
document.addEventListener('DOMContentLoaded', function() {
    // Ir para o topo da página ao carregar
    window.scrollTo(0, 0);
    if (window.logger) window.logger.log('📱 Script principal carregado');
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (window.logger) {
        window.logger.log('Hamburger found:', !!hamburger);
        window.logger.log('Nav menu found:', !!navMenu);
    }
    
    if (hamburger && navMenu) {
        hamburger.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Hamburger clicked - toggling menu');
            console.log('Nav menu classes before:', navMenu.className);
            navMenu.classList.toggle('active');
            console.log('Nav menu classes after:', navMenu.className);
        };
        
        // Fechar menu ao clicar em qualquer link
        const links = navMenu.querySelectorAll('a');
        console.log('Found links:', links.length);
        
        links.forEach(function(link, index) {
            console.log('Setting up link', index + 1, ':', link.textContent);
            link.onclick = function() {
                console.log('Link clicked:', link.textContent);
                navMenu.classList.remove('active');
            };
        });
        
        // Dropdown simples
        const dropdowns = document.querySelectorAll('.dropdown');
        console.log('Found dropdowns:', dropdowns.length);
        
        dropdowns.forEach(function(dropdown) {
            const toggle = dropdown.querySelector('a');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            if (toggle && menu) {
                toggle.onclick = function(e) {
                    e.preventDefault();
                    console.log('Dropdown clicked:', toggle.textContent);
                    menu.classList.toggle('active');
                };
                
                // Fechar menu ao clicar em link do dropdown
                const dropdownLinks = menu.querySelectorAll('a');
                dropdownLinks.forEach(function(dropdownLink) {
                    dropdownLink.onclick = function() {
                        console.log('Dropdown link clicked:', dropdownLink.textContent);
                        navMenu.classList.remove('active');
                    };
                });
            }
        });
    }
    
    // Language Switcher - Simples e funcional
    const langSwitcher = document.querySelector('.language-switcher');
    if (langSwitcher) {
        const langToggle = langSwitcher.querySelector('.lang-toggle');
        const langMenu = langSwitcher.querySelector('.lang-menu');
        
        if (langToggle && langMenu) {
            // Toggle do menu
            langToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                langMenu.classList.toggle('active');
            });
            
            // Seleção de idioma
            langMenu.querySelectorAll('.lang-option').forEach(function(option) {
                option.addEventListener('click', function(e) {
                    e.preventDefault();
                    const selectedLang = this.getAttribute('data-lang');
                    console.log('Idioma selecionado:', selectedLang);
                    
                    // Atualizar botão toggle
                    const flag = this.textContent.split(' ')[0];
                    const name = this.textContent.split(' ').slice(1).join(' ');
                    langToggle.innerHTML = `<span class="lang-flag">${flag}</span><span class="lang-code">${selectedLang.toUpperCase()}</span>`;
                    
                    // Fechar menu
                    langMenu.classList.remove('active');
                    
                    // Salvar preferência
                    localStorage.setItem('precision-language', selectedLang);
                    
                    // Aplicar traduções
                    applyTranslations(selectedLang);
                });
            });
            
            // Fechar menu ao clicar fora
            document.addEventListener('click', function(e) {
                if (!langSwitcher.contains(e.target)) {
                    langMenu.classList.remove('active');
                }
            });
        }
    }
    
    // Aplicar idioma salvo ao carregar a página
    const savedLanguage = localStorage.getItem('precision-language') || 'pt';
    applyTranslations(savedLanguage);
    
    // Atualizar seletor com idioma salvo
    updateLanguageSelector(savedLanguage);
});

// Função para aplicar traduções
function applyTranslations(language) {
    if (!window.Translations || !window.Translations[language]) {
        console.warn('Traduções não encontradas para:', language);
        return;
    }
    
    const translations = window.Translations[language];
    
    // Aplicar traduções em elementos com data-i18n
    document.querySelectorAll('[data-i18n]').forEach(function(element) {
        const key = element.getAttribute('data-i18n');
        const translation = translations[key];
        if (translation) {
            element.textContent = translation;
        }
    });
    
    // Aplicar traduções em elementos com data-i18n-html
    document.querySelectorAll('[data-i18n-html]').forEach(function(element) {
        const key = element.getAttribute('data-i18n-html');
        const translation = translations[key];
        if (translation) {
            element.innerHTML = translation;
        }
    });
    
    // Aplicar traduções em atributos com data-i18n-attr
    document.querySelectorAll('[data-i18n-attr]').forEach(function(element) {
        const attrData = element.getAttribute('data-i18n-attr');
        const [attribute, key] = attrData.split(':');
        const translation = translations[key];
        if (translation && attribute) {
            element.setAttribute(attribute, translation);
        }
    });
    
    // Atualizar atributo lang do documento
    document.documentElement.setAttribute('lang', language);
    
    console.log('Traduções aplicadas para:', language);
}

// Função para atualizar o seletor de idiomas
function updateLanguageSelector(language) {
    const langToggle = document.querySelector('.lang-toggle');
    if (!langToggle) return;
    
    const languageMap = {
        'pt': { flag: '🇧🇷', code: 'PT' },
        'en': { flag: '🇺🇸', code: 'EN' },
        'es': { flag: '🇪🇸', code: 'ES' }
    };
    
    const lang = languageMap[language] || languageMap['pt'];
    langToggle.innerHTML = `<span class="lang-flag">${lang.flag}</span><span class="lang-code">${lang.code}</span>`;
}