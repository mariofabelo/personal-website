// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Typewriter Effect for Name
    const typewriterElement = document.getElementById('typewriter');
    
    if (typewriterElement) {
        const textToType = 'Mario Fabelo';
        let currentIndex = 0;
        
        function typeWriter() {
            if (currentIndex < textToType.length) {
                typewriterElement.textContent += textToType.charAt(currentIndex);
                currentIndex++;
                
                // Variable speed for more realistic typing
                const speed = Math.random() * 100 + 80; // 80-180ms between characters
                setTimeout(typeWriter, speed);
            } else {
                // Remove the blinking cursor when typing is complete
                setTimeout(() => {
                    typewriterElement.classList.add('typing-complete');
                }, 1000);
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeWriter, 1000);
    }
    
    // Simplified Card Hover Effects
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    

    
    // Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.about-card, .portfolio-item, .contact-item, .social-link, .video-card, .channel-header');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Smooth Scroll for Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                let scrollTarget;
                
                // Special case for home section - scroll to top
                if (targetId === '#home') {
                    scrollTarget = 0;
                } else {
                    // Calculate offset for navbar (navbar height + some padding)
                    const navbarHeight = 100; // Approximate navbar height
                    scrollTarget = targetSection.offsetTop - navbarHeight;
                }
                
                // Use window.scrollTo for better control over smooth scrolling
                window.scrollTo({
                    top: scrollTarget,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Button Click Animations
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                pointer-events: none;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
            `;
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateNavbar() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.15)';
            navbar.style.backdropFilter = 'blur(25px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.1)';
            navbar.style.backdropFilter = 'blur(20px)';
        }
        
        // Hide/show navbar on scroll (only if not currently smooth scrolling)
        if (currentScrollY > lastScrollY && currentScrollY > 500) {
            navbar.style.transform = 'translateX(-50%) translateY(-100%)';
        } else {
            navbar.style.transform = 'translateX(-50%) translateY(0)';
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });
    
    // Parallax Effect for Hero Section
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.3; // Reduced for smoother experience
        
        if (hero && scrolled < hero.offsetHeight) {
            // Use requestAnimationFrame for smoother animations
            requestAnimationFrame(() => {
                heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            });
        }
    });
    
    // Contact Form Handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple form animation
            const button = contactForm.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            
            button.textContent = 'Sending...';
            button.style.background = 'rgba(255, 255, 255, 0.2)';
            
            // Simulate sending
            setTimeout(() => {
                button.textContent = 'Message Sent!';
                button.style.background = 'rgba(76, 175, 80, 0.8)';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '';
                    contactForm.reset();
                }, 2000);
            }, 1500);
        });
    }
    
    // Social Media Links Animation
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach((link, index) => {
        // Staggered entrance animation
        link.style.animationDelay = `${index * 0.1}s`;
        
        // Ripple effect on click
        link.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            const rect = link.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                pointer-events: none;
                transform: scale(0);
                animation: socialRipple 0.6s ease-out;
                z-index: 1;
            `;
            
            link.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // YouTube Video Cards Animation
    const videoCards = document.querySelectorAll('.video-card');
    
    videoCards.forEach((card, index) => {
        // Staggered entrance animation
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Click handler for video cards
        card.addEventListener('click', () => {
            // Add a subtle click effect
            card.style.transform = 'translateY(-5px) scale(0.98)';
            
            setTimeout(() => {
                card.style.transform = 'translateY(-5px) scale(1)';
                
                // Get the video URL from data attribute
                const videoUrl = card.getAttribute('data-video-url');
                if (videoUrl) {
                    window.open(videoUrl, '_blank');
                } else {
                    // Fallback to channel URL
                    window.open('https://youtube.com/mariofabelo', '_blank');
                }
            }, 100);
        });
    });
    
    // Tab functionality removed since we now have a single "Recommended Videos" section
    
    // Touch Support for Mobile
    if (isMobile()) {
        // Add touch-based interactions
        floatingCards.forEach(card => {
            card.addEventListener('touchstart', () => {
                card.style.transform = 'translateY(-3px) scale(1.01)';
            });
            
            card.addEventListener('touchend', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // Touch support for social links
        socialLinks.forEach(link => {
            link.addEventListener('touchstart', () => {
                link.style.transform = 'translateY(-3px) scale(1.05)';
            });
            
            link.addEventListener('touchend', () => {
                link.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // Touch support for video cards
        videoCards.forEach(card => {
            card.addEventListener('touchstart', () => {
                card.style.transform = 'translateY(-3px) scale(1.02)';
            });
            
            card.addEventListener('touchend', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    // Utility Functions
    function isMobile() {
        return window.innerWidth <= 768 || 
               /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    

});

// Add CSS for scroll animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: slideInUp 0.8s ease-out;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .floating-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease-out;
    }
    
    .floating-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Enhance glass effect on hover */
    .floating-card:hover {
        background: rgba(255, 255, 255, 0.35);
        border-color: rgba(255, 255, 255, 0.5);
    }
    
    /* Social Media Animations */
    @keyframes socialRipple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .social-link {
        animation: socialSlideUp 0.6s ease-out both;
    }
    
    @keyframes socialSlideUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Video Card Animations */
    .video-card {
        animation: videoSlideUp 0.6s ease-out both;
    }
    
    @keyframes videoSlideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Smooth transitions */
    * {
        transition: transform 0.3s ease, background 0.3s ease, border 0.3s ease;
    }
`;

document.head.appendChild(style); 