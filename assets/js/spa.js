// SPA Navigation System
class SPANavigator {
    constructor() {
        this.currentSection = 'home';
        this.sections = new Map();
        this.init();
    }

    init() {
        this.registerSections();
        this.bindEvents();
        this.handleInitialRoute();
    }

    registerSections() {
        // Registrar seções principais
        this.sections.set('home', document.getElementById('home'));
        this.sections.set('about', document.getElementById('about'));
        this.sections.set('services', document.getElementById('services'));
        this.sections.set('solutions', document.getElementById('solutions'));
        this.sections.set('contact', document.getElementById('contact'));
        
        // Registrar seções de serviços
        this.sections.set('consultoria', document.getElementById('consultoria'));
        this.sections.set('integracao', document.getElementById('integracao'));
        this.sections.set('operacao', document.getElementById('operacao'));
        this.sections.set('certificacao', document.getElementById('certificacao'));
        this.sections.set('treinamento', document.getElementById('treinamento'));
    }

    bindEvents() {
        // Navegação por links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[data-section]');
            if (link) {
                e.preventDefault();
                const sectionId = link.getAttribute('data-section');
                this.navigateToSection(sectionId);
            }
        });

        // Navegação por hash na URL
        window.addEventListener('hashchange', () => {
            this.handleHashChange();
        });

        // Navegação por botões
        document.addEventListener('click', (e) => {
            const button = e.target.closest('button[data-section]');
            if (button) {
                e.preventDefault();
                const sectionId = button.getAttribute('data-section');
                this.navigateToSection(sectionId);
            }
        });
    }

    handleInitialRoute() {
        const hash = window.location.hash.substring(1);
        if (hash && this.sections.has(hash)) {
            this.navigateToSection(hash);
        } else {
            this.navigateToSection('home');
        }
    }

    handleHashChange() {
        const hash = window.location.hash.substring(1);
        if (hash && this.sections.has(hash)) {
            this.navigateToSection(hash);
        }
    }

    navigateToSection(sectionName) {
        // Esconder todas as seções
        this.hideAllSections();
        
        // Mostrar seção alvo
        const targetSection = this.sections.get(sectionName);
        if (targetSection) {
            targetSection.style.display = 'block';
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Atualizar seção atual
        this.currentSection = sectionName;
        
        // Atualizar URL
        this.updateURL(sectionName);
        
        // Atualizar navegação ativa
        this.updateActiveNavigation(sectionName);
        
        // Fechar menu mobile se estiver aberto
        this.closeMobileMenu();
    }

    hideAllSections() {
        this.sections.forEach((section) => {
            if (section) {
                section.style.display = 'none';
            }
        });
    }

    updateURL(sectionName) {
        const newUrl = sectionName === 'home' ? 
            window.location.pathname : 
            `${window.location.pathname}#${sectionName}`;
        
        window.history.pushState({ section: sectionName }, '', newUrl);
    }

    updateActiveNavigation(sectionName) {
        // Remover classe active de todos os links
        document.querySelectorAll('.nav-menu a, .dropdown-menu a').forEach(link => {
            link.classList.remove('active');
        });

        // Adicionar classe active ao link correspondente
        const activeLink = document.querySelector(`a[data-section="${sectionName}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    closeMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        
        if (navMenu && hamburger) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Método público para navegação externa
    goTo(sectionName) {
        this.navigateToSection(sectionName);
    }
}

// Inicializar SPA quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    window.spaNavigator = new SPANavigator();
});

// Exportar para uso global
window.SPANavigator = SPANavigator;
