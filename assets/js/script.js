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
    
    // Language Switcher - Agora gerenciado pelo LanguageSystem
    // O sistema de idiomas é inicializado automaticamente via language-init.js
});