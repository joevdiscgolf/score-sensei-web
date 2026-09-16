// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    observer.observe(card);
});

// Add parallax effect to particles on scroll
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const particles = document.querySelectorAll('.particle');

    particles.forEach((particle, index) => {
        const speed = (index + 1) * 0.1;
        const yPos = -(scrollY * speed);
        particle.style.transform = `translateY(${yPos}px)`;
    });

    lastScrollY = scrollY;
}, { passive: true });

// Add hover effect to store buttons
const storeButtons = document.querySelectorAll('.store-button');

storeButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px) scale(1.02)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Log analytics (placeholder - replace with actual analytics)
console.log('ScoreSensei website loaded');

// Prevent default click on store buttons (since they're placeholders)
document.querySelectorAll('.store-button, .store-button-hero').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Coming soon! The app will be available on the App Store and Google Play.');
    });
});
