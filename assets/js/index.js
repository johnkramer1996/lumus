function courseSlider() {
    var swiper = new Swiper('.course-slider1 .swiper-container', {
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
            nextEl: '.course-slider1 .swiper-button-next',
            prevEl: '.course-slider1 .swiper-button-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1.05,
                spaceBetween: 16,
            },
            400: {
                slidesPerView: 1.3,
            },
            460: {
                slidesPerView: 1.5,
            },
            500: {
                slidesPerView: 1.7,
            },
            690: {
                slidesPerView: 2,
                spaceBetween: 24,
            },
            950: {
                slidesPerView: 2.5,
            },
            1270: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
        },
    })
}

function courseSlider2() {
    var swiper = new Swiper('.course-slider2 .swiper-container', {
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
            nextEl: '.course-slider2 .swiper-button-next',
            prevEl: '.course-slider2 .swiper-button-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1.05,
                spaceBetween: 16,
            },
            400: {
                slidesPerView: 1.3,
            },
            460: {
                slidesPerView: 1.5,
            },
            500: {
                slidesPerView: 1.7,
            },
            690: {
                slidesPerView: 2,
                spaceBetween: 24,
            },
            950: {
                slidesPerView: 2.5,
            },
            1270: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
        },
    })
}

function courseDetail() {
    var swiper = new Swiper('.course-detail .swiper-container', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        navigation: {
            nextEl: '.course-detail .swiper-button-next',
            prevEl: '.course-detail .swiper-button-prev',
        },
        pagination: {
            el: '.course-detail .swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
    })
}

function variantSlider() {
    var swiper = new Swiper('.course-variants .swiper-container', {
        slidesPerView: 3,
        spaceBetween: 24,
    })
}

function feedbackSlider() {
    var swiper = new Swiper('.course-feedback .swiper-container', {
        slidesPerView: 2,
        spaceBetween: 24,
        navigation: {
            nextEl: '.course-feedback .swiper-button-next',
            prevEl: '.course-feedback .swiper-button-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 24,
            },

            1024: {
                slidesPerView: 2,
            },
        },
    })
}

document.addEventListener('DOMContentLoaded', function () {
    // Аналог $(document).ready(function(){
    courseSlider()
    courseSlider2()
    courseDetail()
    feedbackSlider()
    if (window.innerWidth > 1024) {
        variantSlider()
    }

    document.querySelector('.header__burger').onclick = function () {
        this.classList.toggle('header__burger--active')
        document.querySelector('.nav').classList.toggle('nav--active')
        document.querySelector('.header__search').classList.toggle('header__search--active')
    }

    document.querySelector('.nav__dropdown-show').onclick = function () {
        this.classList.toggle('nav__dropdown-show--active')
    }

    document.querySelector('.header__search').onclick = function () {
        this.classList.add('header__search--active')
    }
})
