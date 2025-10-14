// Navigation System
document.addEventListener('DOMContentLoaded', function() {
    // Sidebar Navigation
    const sidebarNav = document.querySelector('.sidebar-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    
    // Show/hide sidebar navigation
    function toggleSidebar() {
        if (sidebarNav) {
            sidebarNav.classList.toggle('active');
        }
    }
    
    // Smooth scroll to section
    function smoothScrollTo(targetId) {
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    // Update active nav link based on scroll position
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Show/hide back to top button
    function toggleBackToTop() {
        if (backToTopBtn) {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
    }
    
    // Event listeners
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            smoothScrollTo(targetId);
            
            // Close sidebar on mobile after clicking
            if (window.innerWidth <= 768 && sidebarNav) {
                sidebarNav.classList.remove('active');
            }
        });
    });
    
    // Back to top functionality
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Scroll events
    window.addEventListener('scroll', function() {
        updateActiveNavLink();
        toggleBackToTop();
    });
    
    // Toggle sidebar on mobile
    const hamburger = document.querySelector('.hamburger');
    if (hamburger && sidebarNav) {
        hamburger.addEventListener('click', function() {
            toggleSidebar();
        });
    }
    
    // Close sidebar when clicking outside
    document.addEventListener('click', function(e) {
        if (sidebarNav && !sidebarNav.contains(e.target) && !hamburger.contains(e.target)) {
            sidebarNav.classList.remove('active');
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && sidebarNav) {
            sidebarNav.classList.remove('active');
        }
    });
    
    // Initialize
    updateActiveNavLink();
    toggleBackToTop();
});
