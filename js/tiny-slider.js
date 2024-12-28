// Tiny Slider initialization
document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('.hero-slider')) {
        tns({
            container: '.hero-slider',
            mode: 'carousel',
            speed: 700,
            autoplay: true,
            controls: false,
            nav: true,
            autoplayButtonOutput: false,
            items: 1,
            mouseDrag: true,
            autoplayTimeout: 5000
        });
    }
}); 