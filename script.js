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
    const animateElements = document.querySelectorAll('.about-card, .portfolio-item, .contact-item, .social-link, .video-card, .channel-header, .cv-card, .cv-section');
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
    
    // Navbar Scroll Effect (keep visible at top)
    const navbar = document.querySelector('.navbar');
    let ticking = false;

    function updateNavbar() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.15)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.1)';
            navbar.style.backdropFilter = 'blur(5px)';
        }

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });
    
    // Smoothly switch to About color palette when About is in view
    const bodyElement = document.body;
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        const aboutPaletteObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    bodyElement.classList.add('theme-about');
                } else {
                    bodyElement.classList.remove('theme-about');
                }
            });
        }, { threshold: 0.4 });
        aboutPaletteObserver.observe(aboutSection);
    }
    
    // Ensure hero content remains fixed and does not move on scroll
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = 'translateY(0)';
    }
    
    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init("8C7fmlHtFDd99SV63"); // You'll need to add your public key here
        console.log('EmailJS initialized successfully');
    } else {
        console.error('EmailJS not loaded!');
    }
    
    // Enhanced Contact Form Handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        const formInputs = contactForm.querySelectorAll('input, textarea');
        const submitButton = contactForm.querySelector('button[type="submit"]');
        
        // Add focus/blur effects
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.style.borderColor = '#3498db';
                input.style.transform = 'translateY(-2px)';
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.style.borderColor = 'rgba(44, 62, 80, 0.1)';
                }
                input.style.transform = 'translateY(0)';
            });
            
            // Add input validation feedback
            input.addEventListener('input', () => {
                if (input.value.length > 0) {
                    input.style.borderColor = '#27ae60';
                } else {
                    input.style.borderColor = 'rgba(44, 62, 80, 0.1)';
                }
            });
        });
        
        // Enhanced form submission with EmailJS
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = contactForm.querySelector('input[name="name"]').value;
            const email = contactForm.querySelector('input[name="email"]').value;
            const message = contactForm.querySelector('textarea[name="message"]').value;
            
            // Validation
            if (!name || !email || !message) {
                showFormMessage('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            try {
                // Send email using EmailJS
                const templateParams = {
                    to_email: 'mariofabeloyt@gmail.com',
                    from_name: name,
                    from_email: email,
                    message: message
                };
                
                console.log('Sending email with params:', templateParams);
                
                const response = await emailjs.send(
                    'service_zky7wvn', // Your service ID
                    'template_lc7i0hi', // Your template ID
                    templateParams
                );
                
                console.log('Email sent successfully:', response);
                
                // Success
                showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
                
                // Reset input styles
                formInputs.forEach(input => {
                    input.style.borderColor = 'rgba(44, 62, 80, 0.1)';
                });
                
                // Animate submit button
                submitButton.innerHTML = '<i class="fas fa-check"></i> Sent!';
                submitButton.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
                
            } catch (error) {
                console.error('Email sending failed:', error);
                console.error('Error details:', {
                    message: error.message,
                    text: error.text,
                    status: error.status
                });
                showFormMessage(`Failed to send message: ${error.message || 'Unknown error'}`, 'error');
            } finally {
                setTimeout(() => {
                    submitButton.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane" style="margin-left: 8px;"></i>';
                    submitButton.style.background = 'linear-gradient(135deg, #3498db, #2980b9)';
                    submitButton.disabled = false;
                }, 3000);
            }
        });
        
        function showFormMessage(message, type) {
            const existingMessage = contactForm.querySelector('.form-message');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            const messageDiv = document.createElement('div');
            messageDiv.className = `form-message ${type}`;
            messageDiv.textContent = message;
            messageDiv.style.cssText = `
                padding: 1rem;
                margin: 1rem 0;
                border-radius: 10px;
                text-align: center;
                font-weight: 500;
                animation: slideInDown 0.3s ease-out;
                ${type === 'success' ? 
                    'background: rgba(39, 174, 96, 0.1); color: #27ae60; border: 1px solid rgba(39, 174, 96, 0.3);' : 
                    'background: rgba(231, 76, 60, 0.1); color: #e74c3c; border: 1px solid rgba(231, 76, 60, 0.3);'
                }
            `;
            
            contactForm.insertBefore(messageDiv, submitButton);
            
            setTimeout(() => {
                messageDiv.style.animation = 'slideOutUp 0.3s ease-out';
                setTimeout(() => messageDiv.remove(), 300);
            }, 5000);
        }
        
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
    }

    // Enhanced Contact Item Interactions
    const contactItems = document.querySelectorAll('.contact-item.clickable');
    contactItems.forEach(item => {
        item.addEventListener('click', () => {
            // Add click animation
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
                item.style.transform = '';
            }, 150);
            
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'contact-ripple';
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: contactRipple 0.6s linear;
                pointer-events: none;
            `;
            
            item.appendChild(ripple);
            
            // Position ripple at click point
            const rect = item.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (rect.width / 2 - size / 2) + 'px';
            ripple.style.top = (rect.height / 2 - size / 2) + 'px';
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
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
    
    // YouTube Stats Integration
    async function updateYouTubeStats() {
        try {
            const response = await fetch('youtube-stats.json');
            if (!response.ok) {
                throw new Error('Failed to fetch YouTube stats');
            }
            
            const stats = await response.json();
            
            // Update the channel stats display
            const channelStatsElement = document.querySelector('.channel-stats');
            if (channelStatsElement && stats.subscriberCount && stats.videoCount) {
                channelStatsElement.innerHTML = `@mariofabelo • ${stats.subscriberCount} subscribers • ${stats.videoCount} videos`;
                
                // Add a subtle update animation
                channelStatsElement.style.animation = 'statsUpdate 0.5s ease-out';
                setTimeout(() => {
                    channelStatsElement.style.animation = '';
                }, 500);
                
                console.log('YouTube stats updated:', stats);
            }
            
            // Show last updated time if available
            if (stats.lastUpdated) {
                const lastUpdated = new Date(stats.lastUpdated);
                const timeAgo = getTimeAgo(lastUpdated);
                
                // Add a small indicator showing when stats were last updated
                const updateIndicator = document.createElement('span');
                updateIndicator.className = 'stats-update-indicator';
                updateIndicator.textContent = ` • Updated ${timeAgo}`;
                updateIndicator.style.cssText = `
                    font-size: 0.8em;
                    opacity: 0.7;
                    font-style: italic;
                `;
                
                // Remove existing indicator if present
                const existingIndicator = document.querySelector('.stats-update-indicator');
                if (existingIndicator) {
                    existingIndicator.remove();
                }
                
                // Add new indicator after the channel stats
                if (channelStatsElement) {
                    channelStatsElement.appendChild(updateIndicator);
                }
            }
            
        } catch (error) {
            console.error('Error updating YouTube stats:', error);
            // Keep existing stats if update fails
        }
    }
    
    // Helper function to format time ago
    function getTimeAgo(date) {
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);
        
        if (diffInSeconds < 60) return 'just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
        return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
    }
    
    // Update stats when page loads
    updateYouTubeStats();
    
    // Update stats every 30 minutes (optional)
    setInterval(updateYouTubeStats, 30 * 60 * 1000);

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
    
    /* CV content should be visible by default */
    .cv-card, .cv-section {
        opacity: 1 !important;
        transform: translateY(0) !important;
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
    
    /* Contact Form Message Animations */
    @keyframes slideInDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideOutUp {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
    
    /* Contact Ripple Animation */
    @keyframes contactRipple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    /* Enhanced Contact Item Hover Effects */
    .contact-item.clickable {
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .contact-item.clickable:active {
        transform: scale(0.98);
    }
    
    /* Form Input Focus Effects */
    .form-group input:focus,
    .form-group textarea:focus {
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(52, 152, 219, 0.2);
    }
    
    /* Submit Button Loading State */
    .contact-form .btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        transform: none;
    }
    
    /* Contact Item Icon Hover Animation */
    .contact-item:hover .contact-icon {
        animation: iconPulse 0.6s ease-in-out;
    }
    
    @keyframes iconPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    
    /* NOTE: Avoid global transitions on transform to prevent scroll jitter */
    
    /* Stats Update Animation */
    @keyframes statsUpdate {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        50% {
            transform: scale(1.05);
            opacity: 0.8;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
`;

document.head.appendChild(style); 