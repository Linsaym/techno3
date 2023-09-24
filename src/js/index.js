import mobileNav from './modules/mobile-nav.js';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import { Navigation, Pagination } from 'swiper/modules';
import IMask from 'imask';

mobileNav();

const swiper = new Swiper('.service__slider', {
    slidesPerView: 4,
    spaceBetween: 23,
    grid: {
        rows: 2,
    },
    navigation: {
        nextEl: ".swiper-next",
        prevEl: ".swiper-prev",
    },
    updateOnWindowResize: true,
    modules: [Navigation, Pagination],
    scrollbar: {
        el: ".swiper-scrollbar",
        hide: false,
    },
    breakpoints: {
        1200: {
            slidesPerView: 4,
            grid: {
                rows: 2,
            },
        },
        1024: {
            slidesPerView: 3,
            grid: {
                rows: 2,
            },
        },
        768: {
            slidesPerView: 2,
            grid: {
                rows: 3,
            },
        },
        0: {
            slidesPerView: 1,
            grid: {
                rows: 4,
            },
        }
    }
})

window.addEventListener('resize', () => {
    swiper.update();
});

let phoneInput = document.querySelector(".phone");
const phoneMask = new IMask(phoneInput, {
    mask: "+{7}(000)000-00-00",
});


