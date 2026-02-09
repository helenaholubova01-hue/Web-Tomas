// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navList = document.getElementById('nav-list');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        const isOpen = navList.classList.contains('nav__list--open');
        navList.classList.toggle('nav__list--open');
        navToggle.setAttribute('aria-expanded', !isOpen);
        navToggle.setAttribute('aria-label', isOpen ? 'Otevřít menu' : 'Zavřít menu');
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav__list a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
            navList.classList.remove('nav__list--open');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.setAttribute('aria-label', 'Otevřít menu');
        }
    });
});

// Close mobile menu on resize to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        navList.classList.remove('nav__list--open');
        navToggle.setAttribute('aria-expanded', 'false');
    }
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
    }
});

// Accordion Interaction
const accordions = document.querySelectorAll('.accordion-item');
accordions.forEach(item => {
    const header = item.querySelector('.accordion-header');

    const toggle = () => {
        const isActive = item.classList.contains('active');

        // Close other accordions
        accordions.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
                otherItem.querySelector('.accordion-body').style.maxHeight = null;
                const otherHeader = otherItem.querySelector('.accordion-header');
                if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
            }
        });

        // Toggle current
        if (isActive) {
            item.classList.remove('active');
            item.querySelector('.accordion-body').style.maxHeight = null;
            header.setAttribute('aria-expanded', 'false');
        } else {
            item.classList.add('active');
            const body = item.querySelector('.accordion-body');
            body.style.maxHeight = body.scrollHeight + "px";
            header.setAttribute('aria-expanded', 'true');
        }
    };

    header.addEventListener('click', toggle);
    header.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
        }
    });
});

// Initialize first accordion body height
const firstActive = document.querySelector('.accordion-item.active .accordion-body');
if (firstActive) {
    firstActive.style.maxHeight = firstActive.scrollHeight + 'px';
}

// Scroll Reveal Animation for Timeline
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('[data-scroll-reveal]').forEach(item => {
    observer.observe(item);
});

// Scroll Reveal for All Sections
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.section').forEach(section => {
    section.classList.add('fade-in-section');
    sectionObserver.observe(section);
});

// ================================
// LIGHTBOX
// ================================

const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox ? lightbox.querySelector('.lightbox__img') : null;
const lightboxCaption = lightbox ? lightbox.querySelector('.lightbox__caption') : null;
const lightboxClose = lightbox ? lightbox.querySelector('.lightbox__close') : null;
const lightboxOverlay = lightbox ? lightbox.querySelector('.lightbox__overlay') : null;
const lightboxPrev = lightbox ? lightbox.querySelector('.lightbox__nav--prev') : null;
const lightboxNext = lightbox ? lightbox.querySelector('.lightbox__nav--next') : null;

const galleryItems = document.querySelectorAll('.gallery-item');
let currentIndex = 0;
let previousFocusElement = null;

function openLightbox(index) {
    if (!lightbox || !galleryItems.length) return;
    currentIndex = index;
    const item = galleryItems[currentIndex];
    const img = item.querySelector('img');
    const caption = item.getAttribute('data-caption') || '';

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('lightbox--open');
    document.body.style.overflow = 'hidden';

    previousFocusElement = document.activeElement;
    lightboxClose.focus();
}

function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('lightbox--open');
    document.body.style.overflow = '';
    lightboxImg.src = '';

    if (previousFocusElement) {
        previousFocusElement.focus();
    }
}

function showPrev() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    updateLightboxImage();
}

function showNext() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    updateLightboxImage();
}

function updateLightboxImage() {
    const item = galleryItems[currentIndex];
    const img = item.querySelector('img');
    const caption = item.getAttribute('data-caption') || '';
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = caption;
}

// Gallery item click/keyboard handlers
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
    item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openLightbox(index);
        }
    });
});

// Lightbox controls
if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);
if (lightboxPrev) lightboxPrev.addEventListener('click', showPrev);
if (lightboxNext) lightboxNext.addEventListener('click', showNext);

// Keyboard navigation in lightbox
document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('lightbox--open')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
});

// ================================
// CONTACT FORM
// ================================

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;

        if (btn) {
            btn.textContent = 'Odesílám...';
            btn.disabled = true;
        }

        setTimeout(() => {
            alert('Děkujeme za vaši poptávku! Ozveme se vám co nejdříve.');
            if (contactForm) contactForm.reset();
            if (btn) {
                btn.textContent = originalText;
                btn.disabled = false;
            }
        }, 1500);
    });
}
