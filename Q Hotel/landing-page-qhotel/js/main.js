document.addEventListener('DOMContentLoaded', function() {
    // === Mobile Menu Toggle ===
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Close mobile menu when clicking a link
    if (mobileMenu) {
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // === Scroll Animations ===
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // === Sticky Navbar ===
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(15, 23, 42, 0.95)';
                navbar.style.backdropFilter = 'blur(12px)';
                navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.background = 'transparent';
                navbar.style.backdropFilter = 'none';
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // === Animated Counters ===
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            el.textContent = current.toLocaleString('id-ID');
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-target]').forEach(el => {
        counterObserver.observe(el);
    });

    // === Date Pickers ===
    const today = new Date().toISOString().split('T')[0];
    const checkIn = document.getElementById('check-in');
    const checkOut = document.getElementById('check-out');

    if (checkIn) {
        checkIn.min = today;
        checkIn.value = today;
        checkIn.addEventListener('change', () => {
            if (checkOut) {
                const nextDay = new Date(checkIn.value);
                nextDay.setDate(nextDay.getDate() + 1);
                checkOut.min = nextDay.toISOString().split('T')[0];
                if (checkOut.value <= checkIn.value) {
                    checkOut.value = nextDay.toISOString().split('T')[0];
                }
            }
        });
    }

    if (checkOut) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        checkOut.min = tomorrow.toISOString().split('T')[0];
        checkOut.value = tomorrow.toISOString().split('T')[0];
    }

    // === Quick Booking Button ===
    const bookingBtn = document.getElementById('booking-btn');
    if (bookingBtn) {
        bookingBtn.addEventListener('click', () => {
            const checkin = checkIn ? checkIn.value : '';
            const checkout = checkOut ? checkOut.value : '';
            const guests = document.getElementById('guests');
            const guestCount = guests ? guests.value : '2';
            const text = 'Halo, saya ingin reservasi kamar di Q Hotel Sangatta.\n\nCheck-in: ' + checkin + '\nCheck-out: ' + checkout + '\nJumlah tamu: ' + guestCount;
            window.open('https://wa.me/6282310151555?text=' + encodeURIComponent(text), '_blank');
        });
    }
});
