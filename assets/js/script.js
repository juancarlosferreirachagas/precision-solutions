// Aguardar o DOM estar carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing menu...');
    
    // Elementos do menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Criar overlay se não existir
    let overlay = document.querySelector('.nav-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        document.body.appendChild(overlay);
        console.log('Overlay created');
    }

    // Função para abrir menu
    function openMenu() {
        console.log('Opening menu...');
        navMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Função para fechar menu
    function closeMenu() {
        console.log('Closing menu...');
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Hambúrguer click
    if (hamburger) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Hamburger clicked');
            
            if (navMenu.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    // Overlay click - fechar menu
    if (overlay) {
        overlay.addEventListener('click', function() {
            console.log('Overlay clicked');
            closeMenu();
        });
    }

    // Links do menu principal
    const menuLinks = document.querySelectorAll('.nav-menu > li > a');
    console.log('Found menu links:', menuLinks.length);
    
    menuLinks.forEach(function(link, index) {
        console.log(`Setting up link ${index + 1}:`, link.textContent);
        
        link.addEventListener('click', function(e) {
            console.log('Menu link clicked:', link.textContent, link.href);
            
            // Se for link interno (#), fazer scroll
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    console.log('Scrolling to:', link.getAttribute('href'));
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
            
            // Fechar menu
            setTimeout(closeMenu, 200);
        });
    });

    // Dropdowns
    const dropdowns = document.querySelectorAll('.dropdown');
    console.log('Found dropdowns:', dropdowns.length);
    
    dropdowns.forEach(function(dropdown, index) {
        const toggle = dropdown.querySelector('a');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (toggle && menu) {
            console.log(`Setting up dropdown ${index + 1}:`, toggle.textContent);
            
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Dropdown toggle clicked:', toggle.textContent);
                
                // Fechar outros dropdowns
                dropdowns.forEach(function(otherDropdown) {
                    if (otherDropdown !== dropdown) {
                        const otherMenu = otherDropdown.querySelector('.dropdown-menu');
                        if (otherMenu) {
                            otherMenu.classList.remove('active');
                        }
                    }
                });
                
                // Toggle este dropdown
                menu.classList.toggle('active');
            });
            
            // Links do dropdown
            const dropdownLinks = menu.querySelectorAll('a');
            dropdownLinks.forEach(function(dropdownLink) {
                dropdownLink.addEventListener('click', function(e) {
                    console.log('Dropdown link clicked:', dropdownLink.textContent);
                    setTimeout(closeMenu, 200);
                });
            });
        }
    });

    // Language Switcher
    const langSwitcher = document.querySelector('.language-switcher');
    if (langSwitcher) {
        const langToggle = langSwitcher.querySelector('.lang-toggle');
        const langMenu = langSwitcher.querySelector('.lang-menu');
        
        if (langToggle && langMenu) {
            console.log('Setting up language switcher');
            
            langToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Language toggle clicked');
                langMenu.classList.toggle('active');
            });
            
            langMenu.querySelectorAll('a').forEach(function(langLink) {
                langLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    const selectedLang = langLink.getAttribute('data-lang');
                    console.log('Language selected:', selectedLang);
                    
                    langToggle.textContent = selectedLang.toUpperCase();
                    langMenu.classList.remove('active');
                });
            });
        }
    }

    // Scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Formulário de contato
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Contact form submitted');
            alert('Formulário enviado com sucesso!');
        });
    }

    console.log('Menu initialization complete');
});