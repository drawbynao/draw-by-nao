// ========================================
// HEADER SCROLL EFFECT
// ========================================
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ========================================
// MOBILE MENU TOGGLE
// ========================================
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ========================================
// FADE IN ON SCROLL
// ========================================
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

fadeElements.forEach(el => fadeObserver.observe(el));

// ========================================
// SMOOTH SCROLL
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 70; // altura del header
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ========================================
// ORDENAR — scroll al formulario
// ========================================
function openOrderModal(productName) {
    const productoInput = document.getElementById('producto');
    const tipoSelect = document.getElementById('tipo');

    productoInput.value = productName;

    if (productName.toLowerCase().includes('hero') || productName.toLowerCase().includes('anime')) {
        tipoSelect.value = 'anime';
    } else if (productName.toLowerCase().includes('skull') || productName.toLowerCase().includes('flame')) {
        tipoSelect.value = 'banda';
    } else if (productName.toLowerCase().includes('bicho')) {
        tipoSelect.value = 'original';
    }

    const contactSection = document.getElementById('contacto');
    const offset = 70;
    const top = contactSection.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });

    setTimeout(() => {
        document.getElementById('nombre').focus();
    }, 800);
}

// ========================================
// FORM SUBMISSION
// ========================================
const orderForm = document.getElementById('orderForm');

orderForm.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('¡Gracias por tu interés en Draw By Nao! 🎨\n\nNos pondremos en contacto contigo en las próximas 24-48 horas.\n\n¡Prepárate para tener arte único!');
    this.reset();
});

// ========================================
// PRODUCT CARD 3D TILT
// ========================================
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotX = (y - cy) / 22;
        const rotY = (cx - x) / 22;
        card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ========================================
// COUNTER ANIMATION
// ========================================
const statNumbers = document.querySelectorAll('.stat-number');

function animateCounter(el, target, suffix) {
    let current = 0;
    const step = target / 50;
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            el.textContent = target + suffix;
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current) + suffix;
        }
    }, 28);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const text = el.textContent;
            const num = parseInt(text.replace(/\D/g, ''));
            const suffix = text.includes('+') ? '+' : text.includes('%') ? '%' : '';
            animateCounter(el, num, suffix);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(s => counterObserver.observe(s));

// ========================================
// CONSOLE EASTER EGG
// ========================================
console.log('%c🎨 Draw By Nao — Arte Que Se Viste', 'font-size:18px;font-weight:bold;color:#DC2626;');
console.log('%c¿Eres dev? Contacto: contacto@drawbynao.com', 'font-size:11px;color:#9CA3AF;');