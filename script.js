document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const menuSpans = document.querySelectorAll('.menu-toggle span');

    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');

        // Simple hamburger animation toggle
        if (mainNav.classList.contains('active')) {
            // Animate to X (can be done with CSS classes in future, keeping simple for now)
            menuSpans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            menuSpans[1].style.opacity = '0';
            menuSpans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
            menuSpans[0].style.transform = 'none';
            menuSpans[1].style.opacity = '1';
            menuSpans[2].style.transform = 'none';
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mainNav.contains(e.target) && !menuToggle.contains(e.target) && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            menuSpans[0].style.transform = 'none';
            menuSpans[1].style.opacity = '1';
            menuSpans[2].style.transform = 'none';
        }
    });

    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            mainNav.classList.remove('active'); // Close menu on link click

            // Reset hamburger icons
            if (window.innerWidth < 768) {
                menuSpans[0].style.transform = 'none';
                menuSpans[1].style.opacity = '1';
                menuSpans[2].style.transform = 'none';
            }

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});


// Intersection Observer for Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // observer.unobserve(entry.target); // Optional: Stop observing once visible
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    // Re-attach observer strictly for timeline content
    const timelineItems = document.querySelectorAll('.timeline-content');
    timelineItems.forEach(item => {
        observer.observe(item);
    });
});
