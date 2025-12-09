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

// Initialize Swiper
document.addEventListener('DOMContentLoaded', function() {
    const solutionsSwiper = new Swiper('.solutionsSwiper', {
        // Optional parameters
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        
        // Autoplay configuration
        autoplay: {
            delay: 3000, // 3 seconds delay
            disableOnInteraction: false, // Continue autoplay after user interaction
            pauseOnMouseEnter: true, // Optional: Pause autoplay on mouse hover
        },
        
        // Responsive breakpoints
        breakpoints: {
            // When window width is >= 768px
            768: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            // When window width is >= 1200px
            1200: {
                slidesPerView: 4,
                spaceBetween: 30
            }
        },
        
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        
        // Disable pagination
        pagination: {
            enabled: false
        }
    });
});