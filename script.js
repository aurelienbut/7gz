document.addEventListener('DOMContentLoaded', () => {
    // SECTION "Cursor Script" SUPPRIMÉE CI-DESSOUS
    /*
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');

    const hideCursor = () => {
        if (window.innerWidth <= 768) {
            if(cursor) cursor.style.display = 'none';
            if(cursorDot) cursorDot.style.display = 'none';
        } else {
            if(cursor) cursor.style.display = 'block';
            if(cursorDot) cursorDot.style.display = 'block';
        }
    };
    hideCursor();
    window.addEventListener('resize', hideCursor);

    if (window.innerWidth > 768 && cursor && cursorDot) {
        document.addEventListener('mousemove', e => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });
        document.addEventListener('mousedown', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(0.8)';
        });
        document.addEventListener('mouseup', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
        document.querySelectorAll('a, button, input[type="submit"], input[type="button"]').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(0)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }
    */

    // Hamburger Menu Script
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');
    const navElement = document.querySelector('.nav');

    if (hamburgerBtn && navLinks && navElement) {
        hamburgerBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburgerBtn.classList.toggle('active');
            navElement.classList.toggle('mobile-menu-open'); // Pour ajouter un style au nav si besoin
        });

        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburgerBtn.classList.remove('active');
                    navElement.classList.remove('mobile-menu-open');
                }
            });
        });
    }

    // Script pour les animations au défilement
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);
    animatedElements.forEach(element => { observer.observe(element); });
});