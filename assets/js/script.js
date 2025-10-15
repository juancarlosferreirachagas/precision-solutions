// Menu hambúrguer simples
document.addEventListener('DOMContentLoaded', function() {
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
});