const BURGER_BTN = document.querySelector('.burger-btn');
const BURGER_MENU = document.querySelector('.burger-menu');

BURGER_BTN.addEventListener('click', () => {
    BURGER_MENU.classList.toggle('burger_open');
    BURGER_BTN.classList.toggle('rotate');
    document.body.classList.toggle('lock');
});

BURGER_MENU.addEventListener('click', (event) => {
    if (event.target.classList.contains('burger-menu') || event.target.classList.contains('burger-link')) {
        BURGER_MENU.classList.remove('burger_open');
        document.body.classList.toggle('lock');
        BURGER_BTN.classList.remove('rotate');
    }
});