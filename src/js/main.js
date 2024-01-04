import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import {Navigation, Pagination} from 'swiper/modules';
import IMask from 'imask';
import emailjs from '@emailjs/browser'

const swiper = new Swiper('.service__slider', {
    slidesPerView: 4,
    spaceBetween: 23,
    grid: {
        rows: -1,
        fill: "row"
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
            spaceBetween: 23,
            slidesPerView: 4,
            grid: {
                rows: 2,
            },
        },
        1024.99: {
            spaceBetween: 23,
            slidesPerView: 3,
            grid: {
                rows: 2,
            },
        },
        768.99: {
            spaceBetween: 23,
            slidesPerView: 2,
            grid: {
                rows: 3,
            },
        },
        576.99: {
            spaceBetween: 23,
            slidesPerView: 2,
            grid: {
                rows: 4,
            },
        },
        0: {
            spaceBetween: 10,
            slidesPerView: 2,
            grid: {
                rows: 4,
            },
        }
    }
})

window.addEventListener('resize', () => {
    isSliderView = true;
    toggleViewButtonPic.style.transform = 'rotateZ(0)';
    swiper.update();
});

const toggleViewButton = document.getElementById('toggleViewButton');
let toggleViewButtonPic = document.querySelector('#toggleViewButton svg')
let isSliderView = true;

toggleViewButton.addEventListener('click', function () {
    isSliderView = !isSliderView;


    if (isSliderView) {
        toggleViewButtonPic.style.transform = 'rotateZ(0)';
        // Показываем слайдер
        switch (swiper.currentBreakpoint) {
            case '1200.99': {
                swiper.params.grid.rows = 2;
                break
            }
            case '1024.99': {
                swiper.params.grid.rows = 2;
                break
            }
            case '768.99': {
                swiper.params.grid.rows = 3;
                break
            }
            case '576.99': {
                swiper.params.grid.rows = 4;
                break
            }
        }
    } else {
        toggleViewButtonPic.style.transform = 'rotateZ(180deg)';
        // Показываем сетку
        switch (swiper.currentBreakpoint) {
            case '1200.99': {
                swiper.params.grid.rows = 4;
                break
            }
            case '1024.99': {
                swiper.params.grid.rows = 5;
                break
            }
            case '768.99': {
                swiper.params.grid.rows = 8;
                break
            }
            case '576.99': {
                swiper.params.grid.rows = 8;
                break
            }

        }
    }

    // Обновляем Swiper
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
            setTimeout(function () {
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