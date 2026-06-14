/**
 * H.I.L. Detailing - Main JavaScript File
 * Handles interactions, animations, and form submissions.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Sticky Navbar ---
    const header = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const hamburger = document.querySelector('.hamburger');

    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        // Simple animation state for hamburger could be added here
        if(mobileMenu.classList.contains('active')) {
            hamburger.style.background = 'transparent';
            hamburger.style.transform = 'rotate(180deg)';
        } else {
            hamburger.style.background = 'var(--color-white)';
            hamburger.style.transform = 'rotate(0deg)';
        }
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMenu);
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // --- Intersection Observer for Scroll Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Optional: only animate once
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-section');
    fadeElements.forEach(el => observer.observe(el));

    // --- Form Submission Handlers ---
    // TEMPORARILY DISABLED FOR FORMSUBMIT ACTIVATION
    /*
    const handleFormSubmit = (formId) => {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const submitBtn = form.querySelector('.submit-btn');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Sending...';
                submitBtn.style.opacity = '0.7';
                
                const formData = new FormData(form);
                
                fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(data => {
                    submitBtn.textContent = 'Details Sent!';
                    submitBtn.style.background = 'var(--color-cyan)';
                    submitBtn.style.color = 'var(--color-black)';
                    submitBtn.style.opacity = '1';
                    
                    form.reset();
                    
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.style.background = 'var(--color-blue)';
                    }, 3000);
                })
                .catch(error => {
                    console.error('Error:', error);
                    submitBtn.textContent = 'Error. Try Again.';
                    submitBtn.style.background = '#ff4444';
                    
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.style.background = 'var(--color-blue)';
                        submitBtn.style.opacity = '1';
                    }, 3000);
                });
            });
        }
    };

    handleFormSubmit('hero-quote-form');
    handleFormSubmit('quote-form');
    */
    // handleFormSubmit('quote-form');
    // handleFormSubmit('hero-quote-form');

    // --- Hero Dust Particles ---
    const particlesContainer = document.getElementById('particles-container');
    if (particlesContainer) {
        const particleCount = 30;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            const size = Math.random() * 4 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            
            particlesContainer.appendChild(particle);
        }
    }

    // --- Mouse Parallax Effect for Hero Text ---
    const heroSection = document.querySelector('.cinematic-hero');
    const heroText = document.getElementById('hero-text');
    
    if (heroSection && heroText) {
        heroSection.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            heroText.style.transform = `translate(${-x * 0.8}px, ${-y * 0.8}px)`;
        });
        
        heroSection.addEventListener('mouseleave', () => {
            heroText.style.transform = `translate(0px, 0px)`;
        });
    }

    // --- Hero Scroll Animation (Canvas) ---
    const canvas = document.querySelector("#hero-canvas");
    if (canvas && typeof gsap !== 'undefined') {
        const context = canvas.getContext("2d");
        const frameCount = 97;
        const currentFrame = (index) =>
            `./assets/frames/frame_${String(index + 1).padStart(4, "0")}.png`;

        const images = [];
        const animation = { frame: 0 };

        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            images.push(img);
        }

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            render();
        }

        function render() {
            const img = images[Math.round(animation.frame)];
            if (!img) return;

            context.clearRect(0, 0, canvas.width, canvas.height);

            const canvasRatio = canvas.width / canvas.height;
            const imageRatio = img.width / img.height;

            let drawWidth;
            let drawHeight;
            let offsetX;
            let offsetY;

            if (canvasRatio > imageRatio) {
                drawWidth = canvas.width;
                drawHeight = canvas.width / imageRatio;
                offsetX = 0;
                offsetY = (canvas.height - drawHeight) / 2;
            } else {
                drawHeight = canvas.height;
                drawWidth = canvas.height * imageRatio;
                offsetX = (canvas.width - drawWidth) / 2;
                offsetY = 0;
            }

            context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        }

        if (images[0]) {
            images[0].onload = () => {
                resizeCanvas();

                gsap.to(animation, {
                    frame: frameCount - 1,
                    snap: "frame",
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".hero-section",
                        start: "top top",
                        end: "+=300%",
                        scrub: 1,
                        pin: true,
                    },
                    onUpdate: render,
                });
            };
        }

        window.addEventListener("resize", resizeCanvas);
    }
});
