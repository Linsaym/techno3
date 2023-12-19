import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import {Navigation, Pagination} from 'swiper/modules';
import IMask from 'imask';
import emailjs from '@emailjs/browser'

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
        1200.99: {
            slidesPerView: 4,
            grid: {
                rows: 2,
            },
        },
        1024.99: {
            slidesPerView: 3,
            grid: {
                rows: 2,
            },
        },
        768.99: {
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

emailjs.init('lAgvLbQogIVOvD8PP')

const btn = document.getElementById('button');

document.getElementById('form')
    .addEventListener('submit', function (event) {
        event.preventDefault();
        if (event.target[0].value.length !== 16) {
            showErrorNotification('Некорректный номер')
        } else {
            // Отключаем кнопку
            btn.disabled = true;

            // Ждем 5 секунд, затем включаем кнопку обратно
            setTimeout(function() {
                btn.disabled = false;
            }, 5000);

            const serviceID = 'service_4zjbeqe';
            const templateID = 'template_q2pwz4f';
            emailjs.sendForm(serviceID, templateID, this)
                .then(res => {
                    showSuccessNotification('Мы получили вашу заявку');
                })
                .catch(err => {
                    showErrorNotification('Попробуйте отправить заявку позже')
                })
        }
    });

function showSuccessNotification(message) {
    showNotification(message, 'success');
}

function showErrorNotification(message) {
    showNotification(message, 'error');
}

function showNotification(message, type) {
    let notification = document.createElement('div');
    notification.innerHTML = message;
    notification.className = 'notification ' + type;
    document.body.appendChild(notification);

    setTimeout(function () {
        notification.style.animation = 'fadeOut 0.5s ease-out'; // Применяем анимацию исчезновения
        setTimeout(function () {
            document.body.removeChild(notification);
        }, 500); // После завершения анимации удаляем элемент
    }, 3000);
}