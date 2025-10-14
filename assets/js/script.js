// Aguardar o DOM estar carregado
document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navOverlay = document.querySelector('.nav-overlay');

    // Criar overlay se não existir
    if (!navOverlay) {
        const overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        document.body.appendChild(overlay);
    }

    const overlay = document.querySelector('.nav-overlay');

    if (hamburger && navMenu && overlay) {
        // Adicionar eventos para touch e click
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            console.log('Menu clicked'); // Debug
        });
        
        hamburger.addEventListener('touchstart', (e) => {
            e.preventDefault();
            navMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            console.log('Menu touched'); // Debug
        });

        // Fechar menu ao clicar no overlay
        overlay.addEventListener('click', () => {
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Fechar menu ao clicar em link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            const handleLinkClick = (e) => {
                console.log('Link clicked:', link.textContent, link.href); // Debug
                
                // Se for link interno (#), fazer scroll suave
                if (link.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(link.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
                
                // Fechar menu após um pequeno delay para permitir navegação
                setTimeout(() => {
                    navMenu.classList.remove('active');
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                }, 100);
            };
            
            // Adicionar eventos para click e touch
            link.addEventListener('click', handleLinkClick);
            link.addEventListener('touchstart', (e) => {
                e.preventDefault();
                handleLinkClick(e);
            });
        });
    }

    // Dropdown mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('a');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        if (dropdownToggle && dropdownMenu) {
            dropdownToggle.addEventListener('click', (e) => {
                e.preventDefault();
                dropdownMenu.classList.toggle('active');
                console.log('Dropdown toggled:', dropdownToggle.textContent); // Debug
                
                // Fechar outros dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        const otherMenu = otherDropdown.querySelector('.dropdown-menu');
                        if (otherMenu) {
                            otherMenu.classList.remove('active');
                        }
                    }
                });
            });
            
            // Adicionar eventos aos links do dropdown
            dropdownMenu.querySelectorAll('a').forEach(dropdownLink => {
                dropdownLink.addEventListener('click', (e) => {
                    console.log('Dropdown link clicked:', dropdownLink.textContent, dropdownLink.href); // Debug
                    
                    // Fechar menu após um pequeno delay
                    setTimeout(() => {
                        navMenu.classList.remove('active');
                        overlay.classList.remove('active');
                        document.body.style.overflow = '';
                    }, 100);
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
            langToggle.addEventListener('click', (e) => {
                e.preventDefault();
                langMenu.classList.toggle('active');
                console.log('Language menu toggled'); // Debug
            });
            
            // Fechar menu de idiomas ao clicar em um idioma
            langMenu.querySelectorAll('a').forEach(langLink => {
                langLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    const selectedLang = langLink.getAttribute('data-lang');
                    console.log('Language selected:', selectedLang); // Debug
                    
                    // Atualizar o texto do toggle
                    langToggle.textContent = selectedLang.toUpperCase();
                    
                    // Fechar menu
                    langMenu.classList.remove('active');
                    
                    // Aqui você pode implementar a lógica de mudança de idioma
                    // Por exemplo, recarregar a página com parâmetro de idioma
                    // window.location.href = `?lang=${selectedLang}`;
                });
            });
        }
    }

    // Scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Formulário de contato
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Coletar dados
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simular envio
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            
            // Limpar formulário
            this.reset();
        });
    }

    // Funcionalidade dos produtos
    // Botões de orçamento
    document.querySelectorAll('.btn-quote').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            if (productCard) {
                const productName = productCard.querySelector('h4').textContent;
                
                // Preencher formulário automaticamente
                const form = document.getElementById('contactForm') || document.querySelector('.contact-form');
                if (form) {
                    const produtoInput = form.querySelector('input[name="produto_interesse"]');
                    const tipoSelect = form.querySelector('select[name="tipo_solicitacao"]');
                    const assuntoInput = form.querySelector('input[name="assunto_contato"]');
                    
                    if (produtoInput) produtoInput.value = productName;
                    if (tipoSelect) tipoSelect.value = 'orcamento';
                    if (assuntoInput) assuntoInput.value = `Orçamento - ${productName}`;
                    
                    // Scroll para o formulário
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
        });
    });
    
    // Botões de datasheet
    document.querySelectorAll('.btn-datasheet').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            if (productCard) {
                const productName = productCard.querySelector('h4').textContent;
                
                // Simular abertura de PDF
                alert(`Abrindo datasheet do ${productName}...\n\n(Em um site real, aqui abriria o PDF do produto)`);
            }
        });
    });

    // Animação de scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos
    const elements = document.querySelectorAll('.differential, .service, .solution, .timeline-item, .mv-item');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Hero Carousel
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    let currentSlide = 0;
    
    function showNextSlide() {
        carouselSlides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % carouselSlides.length;
        carouselSlides[currentSlide].classList.add('active');
    }
    
    if (carouselSlides.length > 0) {
        setInterval(showNextSlide, 4000); // Troca a cada 4 segundos
    }
});
