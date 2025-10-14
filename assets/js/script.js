// Aguardar o DOM estar carregado
document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Fechar menu ao clicar em link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
});

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
});

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
});
