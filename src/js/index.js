import mobileNav from './modules/mobile-nav.js';

mobileNav();

const tgLink = 'https://t.me/technocrat124';

const tgLinks = document.querySelectorAll('.tg-link')
tgLinks.forEach(link => link.href = tgLink)


const callPopup = document.querySelector('.call-popup');
const callPopupCloseBtn = document.querySelector('.call-popup__close-btn')
callPopupCloseBtn.addEventListener('click', e => {
    callPopup.style.left = '20px';
    callPopup.style.animation = 'none';
    setTimeout(() => callPopup.style.left = '-500px', 0.0001,)
    // callPopup.style.left = '100px';

})