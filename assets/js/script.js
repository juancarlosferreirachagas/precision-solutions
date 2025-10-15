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
        hamburger.onclick = function() {
            if (window.logger) window.logger.log('Hamburger clicked');
            navMenu.classList.toggle('active');
        };
        
        // Fechar menu ao clicar em qualquer link
        const links = navMenu.querySelectorAll('a');
        if (window.logger) window.logger.log('Found links:', links.length);
        
        links.forEach(function(link, index) {
            if (window.logger) window.logger.log('Setting up link', index + 1, ':', link.textContent);
            link.onclick = function() {
                if (window.logger) window.logger.log('Link clicked:', link.textContent);
                navMenu.classList.remove('active');
            };
        });
        
        // Dropdown simples
        const dropdowns = document.querySelectorAll('.dropdown');
        if (window.logger) window.logger.log('Found dropdowns:', dropdowns.length);
        
        dropdowns.forEach(function(dropdown) {
            const toggle = dropdown.querySelector('a');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            if (toggle && menu) {
                toggle.onclick = function(e) {
                    e.preventDefault();
                    if (window.logger) window.logger.log('Dropdown clicked:', toggle.textContent);
                    menu.classList.toggle('active');
                };
                
                // Fechar menu ao clicar em link do dropdown
                const dropdownLinks = menu.querySelectorAll('a');
                dropdownLinks.forEach(function(dropdownLink) {
                    dropdownLink.onclick = function() {
                        if (window.logger) window.logger.log('Dropdown link clicked:', dropdownLink.textContent);
                        navMenu.classList.remove('active');
                    };
                });
            }
        });
    }
    
    // Language Switcher
    const langSwitcher = document.querySelector('.language-switcher');
    if (langSwitcher) {
        const langToggle = langSwitcher.querySelector('.lang-toggle');
        const langMenu = langSwitcher.querySelector('.lang-menu');
        
        if (langToggle && langMenu) {
            langToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (window.logger) window.logger.log('Language toggle clicked');
                langMenu.classList.toggle('active');
            });
            
            langMenu.querySelectorAll('a').forEach(function(langLink) {
                langLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    const selectedLang = langLink.getAttribute('data-lang');
                    if (window.logger) window.logger.log('Language selected:', selectedLang);
                    
                    // Usar sistema de internacionalização
                    if (window.i18n) {
                        if (window.logger) window.logger.log('🌍 Mudando idioma via i18n...');
                        window.i18n.changeLanguage(selectedLang);
                    } else {
                        if (window.logger) window.logger.error('❌ Sistema i18n não encontrado!');
                    }
                    
                    langMenu.classList.remove('active');
                });
            });
        }
    }
});