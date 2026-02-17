/**
 * Hotel Royal Victoria - Main JavaScript
 * Smooth scroll, animations, and interactive features
 */

document.addEventListener('DOMContentLoaded', function() {

    // ==========================================
    // Mobile Menu Toggle
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('open');

            // Toggle hamburger icon to X
            const svg = mobileMenuBtn.querySelector('svg');
            if (mobileMenu.classList.contains('open')) {
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>';
            } else {
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
            }
        });

        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('open');
                const svg = mobileMenuBtn.querySelector('svg');
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
            });
        });
    }

    // ==========================================
    // Navbar Background on Scroll
    // ==========================================
    const navbar = document.getElementById('navbar');
    let lastScrollY = window.scrollY;

    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScrollY = window.scrollY;
    }

    window.addEventListener('scroll', updateNavbar);
    updateNavbar(); // Check initial state

    // ==========================================
    // Scroll Animations
    // ==========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // ==========================================
    // Smooth Scroll for Anchor Links
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href === '#') return;

            e.preventDefault();

            const target = document.querySelector(href);
            if (target) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // Set Minimum Date for Booking Form
    // ==========================================
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const checkInInput = document.querySelector('input[type="date"]:first-of-type');
    const checkOutInput = document.querySelector('input[type="date"]:last-of-type');

    if (checkInInput && checkOutInput) {
        checkInInput.min = formatDate(today);
        checkInInput.value = formatDate(today);

        checkOutInput.min = formatDate(tomorrow);
        checkOutInput.value = formatDate(tomorrow);

        // Update checkout minimum when check-in changes
        checkInInput.addEventListener('change', function() {
            const checkInDate = new Date(this.value);
            const minCheckOut = new Date(checkInDate);
            minCheckOut.setDate(minCheckOut.getDate() + 1);

            checkOutInput.min = formatDate(minCheckOut);

            if (new Date(checkOutInput.value) <= checkInDate) {
                checkOutInput.value = formatDate(minCheckOut);
            }
        });
    }

    // ==========================================
    // Counter Animation
    // ==========================================
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);

            const current = Math.floor(start + (target - start) * easeOut);
            element.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target.toLocaleString();
            }
        }

        requestAnimationFrame(update);
    }

    // ==========================================
    // Gallery Lightbox (Simple Implementation)
    // ==========================================
    const galleryImages = document.querySelectorAll('#gallery img');

    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            // Create lightbox overlay
            const overlay = document.createElement('div');
            overlay.className = 'fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-pointer';
            overlay.innerHTML = `
                <img src="${this.src}" alt="${this.alt}" class="max-w-full max-h-full object-contain rounded-lg">
                <button class="absolute top-4 right-4 text-white text-4xl hover:text-primary transition-colors">&times;</button>
            `;

            document.body.appendChild(overlay);
            document.body.style.overflow = 'hidden';

            // Fade in
            setTimeout(() => {
                overlay.style.opacity = '1';
            }, 10);

            // Close on click
            overlay.addEventListener('click', function() {
                document.body.style.overflow = '';
                overlay.remove();
            });

            // Close on escape key
            document.addEventListener('keydown', function closeOnEscape(e) {
                if (e.key === 'Escape') {
                    document.body.style.overflow = '';
                    overlay.remove();
                    document.removeEventListener('keydown', closeOnEscape);
                }
            });
        });
    });

    // ==========================================
    // Active Navigation Link
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    function updateActiveLink() {
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('text-white');
                    link.classList.add('text-slate-300');

                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.remove('text-slate-300');
                        link.classList.add('text-white');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();

    // ==========================================
    // Lazy Loading Images
    // ==========================================
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ==========================================
    // WhatsApp Link with Dynamic Message
    // ==========================================
    const bookingForm = document.querySelector('.glass-card');
    if (bookingForm) {
        const checkAvailabilityBtn = bookingForm.querySelector('a[href*="wa.me"]');

        if (checkAvailabilityBtn) {
            checkAvailabilityBtn.addEventListener('click', function(e) {
                e.preventDefault();

                const checkIn = checkInInput?.value || '';
                const checkOut = checkOutInput?.value || '';
                const guests = bookingForm.querySelector('select')?.value || '1 Tamu';

                let message = 'Halo, saya ingin melakukan reservasi:';
                message += `%0A- Check-in: ${checkIn}`;
                message += `%0A- Check-out: ${checkOut}`;
                message += `%0A- Jumlah tamu: ${guests}`;
                message += '%0A%0AMohon informasi ketersediaan kamar. Terima kasih!';

                window.open(`https://wa.me/628115440900?text=${message}`, '_blank');
            });
        }
    }

    // ==========================================
    // Performance: Debounce scroll events
    // ==========================================
    function debounce(func, wait = 10) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // Apply debounce to scroll handlers
    window.addEventListener('scroll', debounce(updateNavbar, 10));
    window.addEventListener('scroll', debounce(updateActiveLink, 10));

    // ==========================================
    // Console branding
    // ==========================================
    console.log(
        '%c Hotel Royal Victoria ',
        'background: linear-gradient(90deg, #3B82F6, #60A5FA); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 5px;'
    );
    console.log(
        '%c Website Preview by ALURWEB ',
        'color: #64748B; font-size: 12px;'
    );

});
