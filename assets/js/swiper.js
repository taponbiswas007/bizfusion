const testimonialsSwiper = new Swiper('.testimonials-swiper', {
    // Optional parameters
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,    
    },
    
    // Navigation arrows
    navigation: {
        nextEl: '.testimonials-next',
        prevEl: '.testimonials-prev',
    },
    
    // Remove pagination dots
    pagination: false,
    
    // Responsive breakpoints
    breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 1,
            spaceBetween: 15,
        },
        // when window width is >= 768px
        768: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        // when window width is >= 992px
        992: {
            slidesPerView: 3,
            spaceBetween: 30,
        }
    }
});