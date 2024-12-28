import { content } from './content.js';

document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
    });

    // Initialize content
    initializeContent();

    // Initialize animations and interactions
    initializeInteractions();
});

function initializeContent() {
    // Populate hero section
    document.querySelector('.hero-title').textContent = content.hero.title;
    document.querySelector('.hero-description').textContent = content.hero.subtitle;

    // Populate beliefs section
    const beliefsGrid = document.querySelector('.beliefs-grid');
    content.beliefs.items.forEach((belief, index) => {
        beliefsGrid.innerHTML += `
            <div class="col-md-4 mb-4">
                <div class="feature-card" data-aos="fade-up" data-aos-delay="${index * 100}">
                    <i class="${belief.icon} feature-icon"></i>
                    <h3>${belief.title}</h3>
                    <p>${belief.description}</p>
                </div>
            </div>
        `;
    });

    // Populate programs section
    const programsGrid = document.querySelector('.programs-grid');
    content.programs.items.forEach((program, index) => {
        programsGrid.innerHTML += `
            <div class="col-md-4 mb-4">
                <div class="feature-card" data-aos="fade-up" data-aos-delay="${index * 100}">
                    <h3>${program.title}</h3>
                    <p>${program.description}</p>
                    <div class="program-deadline">Deadline: ${program.deadline}</div>
                </div>
            </div>
        `;
    });

    // Populate impact section
    const statsGrid = document.querySelector('.stats-grid');
    content.impact.stats.forEach((stat, index) => {
        statsGrid.innerHTML += `
            <div class="col-md-3 col-sm-6 mb-4">
                <div class="stat-card" data-aos="fade-up" data-aos-delay="${index * 100}">
                    <div class="stat-number" data-target="${stat.number}">0</div>
                    <div class="stat-label">${stat.label}</div>
                </div>
            </div>
        `;
    });

    // Populate footer
    document.querySelector('.copyright').textContent = content.footer.copyright;
    const socialLinks = document.querySelector('.social-links');
    content.footer.socials.forEach(social => {
        socialLinks.innerHTML += `
            <a href="${social.url}" target="_blank">
                <i class="${social.icon}"></i>
            </a>
        `;
    });
}

function initializeInteractions() {
    // Navbar scroll behavior
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

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

    // Initialize number counters
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numberElement = entry.target;
                const target = parseInt(numberElement.dataset.target);
                animateNumber(numberElement, target);
                observer.unobserve(numberElement);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.stat-number').forEach(number => {
        observer.observe(number);
    });
}

function animateNumber(element, target) {
    let current = 0;
    const duration = 2000;
    const step = target / (duration / 16);

    function update() {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }

    update();
} 