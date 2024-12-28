document.addEventListener('DOMContentLoaded', function () {
    // Initialize all tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });

    // Initialize all popovers
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
    });

    // Handle mobile navigation
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function (e) {
            document.querySelector('body').classList.toggle('mobile-nav-active');
            this.classList.toggle('bi-list');
            this.classList.toggle('bi-x');
        });
    }

    // Handle scroll events
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            document.querySelector('.back-to-top').classList.add('active');
        } else {
            document.querySelector('.back-to-top').classList.remove('active');
        }
    });
});

// Counter Animation
function startCounter() {
    const counters = document.querySelectorAll('.number');
    const speed = 200;

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-number');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
}

// Gallery Filter
const initGallery = () => {
    const iso = new Isotope('.gallery-grid', {
        itemSelector: '.gallery-item',
        layoutMode: 'fitRows'
    });

    document.querySelector('.gallery-filters').addEventListener('click', (e) => {
        if (e.target.classList.contains('btn')) {
            const filterValue = e.target.getAttribute('data-filter');
            iso.arrange({ filter: filterValue });
            
            // Update active button
            document.querySelectorAll('.gallery-filters .btn').forEach(btn => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');
        }
    });
};

// Newsletter Subscription
document.getElementById('newsletter-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    try {
        // Add your newsletter subscription logic here
        alert('Thank you for subscribing!');
        e.target.reset();
    } catch (error) {
        alert('There was an error. Please try again.');
    }
});

// Social Media Feed Integration
const loadSocialFeeds = () => {
    // Load Twitter Widget
    window.twttr && twttr.widgets.load();
    
    // Load Facebook Widget
    FB && FB.XFBML.parse();
    
    // Load Instagram Feed (requires Instagram Basic Display API)
    loadInstagramFeed();
};

document.addEventListener('DOMContentLoaded', () => {
    startCounter();
    initGallery();
    loadSocialFeeds();
}); 