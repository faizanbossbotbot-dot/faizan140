// =====================================================
// PREMIUM BLOG - MAIN JAVASCRIPT
// =====================================================

(function() {
    'use strict';

    // ===== NAVIGATION MENU TOGGLE =====
    function initMenuToggle() {
        const menuToggle = document.getElementById('menu-toggle');
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav-link');

        if (menuToggle) {
            menuToggle.addEventListener('click', function() {
                navbar.classList.toggle('mobile-open');
                this.classList.toggle('active');
            });

            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    navbar.classList.remove('mobile-open');
                    menuToggle.classList.remove('active');
                });
            });
        }
    }

    // ===== SMOOTH SCROLL =====
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // ===== STICKY HEADER =====
    function initStickyHeader() {
        const header = document.getElementById('header');
        let lastScrollTop = 0;

        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 50) {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.05)';
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }, false);
    }

    // ===== LAZY LOADING IMAGES =====
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px',
                threshold: 0.01
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // ===== ACTIVE NAV LINK =====
    function updateActiveNavLink() {
        const currentLocation = location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentLocation || 
                link.getAttribute('href') === '/' && currentLocation === '/index.html') {
                link.classList.add('active');
            }
        });
    }

    // ===== NEWSLETTER FORM =====
    function initNewsletterForm() {
        const form = document.getElementById('newsletter-form');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = this.querySelector('input[type="email"]').value;
                
                // Store subscription
                const subscriptions = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
                if (!subscriptions.includes(email)) {
                    subscriptions.push(email);
                    localStorage.setItem('newsletter_subscribers', JSON.stringify(subscriptions));
                }
                
                alert('Thank you for subscribing! Check your email for confirmation.');
                this.reset();
            });
        }
    }

    // ===== SEARCH FORM =====
    function initSearchForm() {
        const searchForm = document.getElementById('search-form');
        if (searchForm) {
            searchForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const query = document.getElementById('search-input').value;
                if (query.trim()) {
                    window.location.href = `/search.html?q=${encodeURIComponent(query)}`;
                }
            });
        }
    }

    // ===== PERFORMANCE: REPORT WEB VITALS =====
    function initWebVitals() {
        // Monitor Core Web Vitals
        if ('PerformanceObserver' in window) {
            try {
                // Largest Contentful Paint
                new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
                }).observe({ entryTypes: ['largest-contentful-paint'] });

                // First Input Delay
                new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach((entry) => {
                        console.log('FID:', entry.processingDuration);
                    });
                }).observe({ entryTypes: ['first-input'] });

                // Cumulative Layout Shift
                new PerformanceObserver((list) => {
                    let clsValue = 0;
                    list.getEntries().forEach((entry) => {
                        if (!entry.hadRecentInput) {
                            clsValue += entry.value;
                        }
                    });
                    console.log('CLS:', clsValue);
                }).observe({ entryTypes: ['layout-shift'] });
            } catch (e) {
                console.log('Web Vitals monitoring not supported');
            }
        }
    }

    // ===== ANALYTICS TRACKING =====
    function trackPageView() {
        // Track page views for analytics
        if (typeof gtag !== 'undefined') {
            gtag('config', 'GA_MEASUREMENT_ID', {
                'page_path': window.location.pathname,
                'page_title': document.title
            });
        }
    }

    // ===== INITIALIZE ALL =====
    function init() {
        initMenuToggle();
        initSmoothScroll();
        initStickyHeader();
        initLazyLoading();
        updateActiveNavLink();
        initNewsletterForm();
        initSearchForm();
        initWebVitals();
        trackPageView();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
