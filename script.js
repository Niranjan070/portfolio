// Portfolio JavaScript Code
// Navigation and Mobile Menu
class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupAnimations();
        this.setupProjectModals();
        this.setupContactForm();
        this.setupScrollEffects();
        this.setupMobileMenu();
        this.setupCertificatesScroll();
    }

    // Navigation Setup
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section');

        // Smooth scroll for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }

                // Close mobile menu if open
                this.closeMobileMenu();
            });
        });

        // Update active nav link on scroll
        window.addEventListener('scroll', () => {
            this.updateActiveNavLink();
            this.updateNavbarBackground();
        });
    }

    // Update active navigation link based on scroll position
    updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Update navbar background on scroll
    updateNavbarBackground() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.9)';
        }
    }

    // Mobile Menu Setup
    setupMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }
    }

    closeMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }

    // Animation Setup
    setupAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        const animatableElements = document.querySelectorAll('.skill-item, .project-card, .certificate-card, .stat-item');
        animatableElements.forEach(el => {
            observer.observe(el);
        });

        // Typing animation for hero text (optional enhancement)
        this.setupTypingAnimation();
    }

    // Typing animation for hero text
    setupTypingAnimation() {
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle) {
            const text = heroSubtitle.textContent;
            heroSubtitle.textContent = '';
            heroSubtitle.style.opacity = '1';

            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    heroSubtitle.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                }
            };

            // Start typing animation after hero title animation
            setTimeout(typeWriter, 1500);
        }
    }

    // Project Modal Setup
    setupProjectModals() {
        const modal = document.getElementById('projectModal');
        const closeModal = document.querySelector('.close-modal');
        
        if (!modal || !closeModal) return;

        // Project data
        this.projectData = {
            1: {
                title: "Fake News Detection System",
                image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
                description: "News classifier using TF-IDF + Logistic Regression (88% accuracy). Integrated keyword alerts, URL scanning, and Flask web app.",
                technologies: ["Python", "Scikit-learn", "Pandas", "Flask"],
                features: [
                    "TF-IDF vectorization",
                    "Logistic Regression model",
                    "88% accuracy",
                    "Keyword alerts",
                    "URL scanning integration",
                    "Flask web interface"
                ],
                github: "#",
                live: "#"
            },
            2: {
                title: "Bank Customer Churn Prediction",
                image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600&h=400&fit=crop",
                description: "Decision Tree model to predict customer churn, improved accuracy by 12%. Performed EDA and feature engineering for churn factors.",
                technologies: ["Python", "Decision Trees", "Pandas"],
                features: [
                    "Decision Tree algorithm",
                    "12% accuracy improvement",
                    "Exploratory Data Analysis",
                    "Feature engineering for churn",
                    "Visualization of churn factors"
                ],
                github: "#",
                live: "#"
            }
        };

        // Close modal events
        closeModal.addEventListener('click', () => this.closeProjectModal());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeProjectModal();
            }
        });

        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                this.closeProjectModal();
            }
        });
    }

    // Open project modal
    openProjectModal(projectId) {
        const modal = document.getElementById('projectModal');
        const project = this.projectData[projectId];
        
        if (!project || !modal) return;

        // Populate modal content
        document.getElementById('modalImage').src = project.image;
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalDescription').textContent = project.description;
        
        // Technologies
        const techContainer = document.getElementById('modalTech');
        techContainer.innerHTML = '';
        project.technologies.forEach(tech => {
            const span = document.createElement('span');
            span.textContent = tech;
            techContainer.appendChild(span);
        });

        // Features
        const featuresContainer = document.getElementById('modalFeatures');
        featuresContainer.innerHTML = '';
        project.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresContainer.appendChild(li);
        });

        // Links
        document.getElementById('modalGithub').href = project.github;
        document.getElementById('modalLive').href = project.live;

        // Show modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Close project modal
    closeProjectModal() {
        const modal = document.getElementById('projectModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    // Contact Form Setup
    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleContactForm(contactForm);
        });
    }

    // Handle contact form submission
    async handleContactForm(form) {
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        try {
            // Simulate form submission (replace with actual endpoint)
            await this.simulateFormSubmission(formData);
            
            // Success feedback
            this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
            
        } catch (error) {
            // Error feedback
            this.showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            // Reset button
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }
    }

    // Simulate form submission
    simulateFormSubmission(formData) {
        return new Promise((resolve, reject) => {
            // Simulate API call delay
            setTimeout(() => {
                // Simulate random success/failure for demo
                if (Math.random() > 0.2) {
                    resolve();
                } else {
                    reject(new Error('Submission failed'));
                }
            }, 2000);
        });
    }

    // Show notification
    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#00d4ff' : '#ff4757'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 3000;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideInRight 0.3s ease;
            max-width: 350px;
        `;

        // Add to DOM
        document.body.appendChild(notification);

        // Close button functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
            this.removeNotification(notification);
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            this.removeNotification(notification);
        }, 5000);
    }

    // Remove notification
    removeNotification(notification) {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // Scroll Effects Setup
    setupScrollEffects() {
        // Parallax effect for hero background
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.animated-bg');
            
            if (parallax) {
                parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        // Scroll indicator
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }

    // Certificates Scroll Setup
    setupCertificatesScroll() {
        const certificatesContainer = document.querySelector('.certificates-scroll');
        
        if (!certificatesContainer) return;

        // Add smooth scroll behavior
        let isDown = false;
        let startX;
        let scrollLeft;

        certificatesContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - certificatesContainer.offsetLeft;
            scrollLeft = certificatesContainer.scrollLeft;
            certificatesContainer.style.cursor = 'grabbing';
        });

        certificatesContainer.addEventListener('mouseleave', () => {
            isDown = false;
            certificatesContainer.style.cursor = 'grab';
        });

        certificatesContainer.addEventListener('mouseup', () => {
            isDown = false;
            certificatesContainer.style.cursor = 'grab';
        });

        certificatesContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - certificatesContainer.offsetLeft;
            const walk = (x - startX) * 2;
            certificatesContainer.scrollLeft = scrollLeft - walk;
        });
    }

    // Utility method to add CSS animations
    addAnimationCSS() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            .animate-in {
                animation: fadeInUp 0.8s ease forwards;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 18px;
                cursor: pointer;
                padding: 0;
                margin-left: 10px;
            }
            
            .certificates-scroll {
                cursor: grab;
            }
            
            .certificates-scroll:active {
                cursor: grabbing;
            }
        `;
        document.head.appendChild(style);
    }
}

// Global function for project modal (called from HTML)
function openProjectModal(projectId) {
    if (window.portfolioApp) {
        window.portfolioApp.openProjectModal(projectId);
    }
}

// Skills Section Tab Filtering
function setupSkillsTabs() {
    const tabs = document.querySelectorAll('.skills-tab');
    const cards = document.querySelectorAll('.skill-card');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const filter = this.getAttribute('data-filter');
            cards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Initialize the portfolio app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioApp = new PortfolioApp();
    window.portfolioApp.addAnimationCSS();
    
    // Add loading animation
    const loadingElements = document.querySelectorAll('.loading');
    loadingElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('loaded');
        }, index * 100);
    });
    setupSkillsTabs();
});

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/smoothscroll/1.4.10/SmoothScroll.min.js';
    document.head.appendChild(script);
}

// Add resize event listener for responsive adjustments
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    if (window.portfolioApp) {
        window.portfolioApp.closeMobileMenu();
    }
});

// Add smooth scrolling for all anchor links
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});