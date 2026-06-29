/*Burger Menu*/

const BURGER_BTN = document.querySelector('.burger-btn');
const BURGER_MENU = document.querySelector('.burger-menu');
const BURGER_WRAPPER = document.querySelector('.burger__wrapper');

BURGER_BTN.addEventListener('click', () => {
    BURGER_MENU.classList.toggle('burger_open');
    BURGER_BTN.classList.toggle('rotate');
    document.body.classList.toggle('lock');
    BURGER_WRAPPER.classList.toggle('visible');
});

BURGER_MENU.addEventListener('click', (event) => {
    if (event.target.classList.contains('burger-link')) {
        BURGER_MENU.classList.remove('burger_open');
        document.body.classList.remove('lock');
        BURGER_BTN.classList.remove('rotate');
        BURGER_WRAPPER.classList.remove('visible');
    }
});

BURGER_WRAPPER.addEventListener('click', (event) => {
    if (event.target.classList.contains('burger__wrapper')) {
        BURGER_MENU.classList.remove('burger_open');
        document.body.classList.remove('lock');
        BURGER_BTN.classList.remove('rotate');
        BURGER_WRAPPER.classList.remove('visible');
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        BURGER_MENU.classList.remove('burger_open');
        BURGER_BTN.classList.remove('rotate');
        document.body.classList.remove('lock');
        BURGER_WRAPPER.classList.remove('visible');
    }
});


/*Carousel Slider*/


const SLIDER = document.querySelector('.slider__row');
const BTN_PREV = document.querySelector('.arrow.prev');
const BTN_NEXT = document.querySelector('.arrow.next');
const BTN_PREV_MOBILE = document.querySelector('.arrow.prev.mobile');

let ALL_CARDS = [];
let threeCards = [];
let remainingCards = [];

async function sliderCards() {
    const RESPONSE = await fetch('script/pets.json');
    ALL_CARDS = await RESPONSE.json();
    threeCards = shuffleCards([...ALL_CARDS]).slice(0, 3);
    remainingCards = ALL_CARDS.filter(card => !threeCards.includes(card));
    renderCards(threeCards);
}

sliderCards();

function renderCards(ALL_CARDS) {
    SLIDER.innerHTML = ALL_CARDS.map(card => `
        <div class="pets__card" data-name="${card.name}">
            <div class="card__img">
                <img src="${card.img}" alt="${card.name}">
            </div>
            <div class="card__text">
                <p>${card.name}</p>
            </div>
            <button class="card__btn">Learn more</button>
        </div>
    `).join('');
}

function shuffleCards(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function switchCards() {
    const newThreeCards = remainingCards.slice(0, 3);
    remainingCards = shuffleCards([...remainingCards.slice(3), ...threeCards]);
    threeCards = newThreeCards;
    renderCards(threeCards);
}

BTN_PREV.addEventListener('click', transitionLeft);
BTN_NEXT.addEventListener('click', transitionRight);
BTN_PREV_MOBILE.addEventListener('click', transitionLeft);

function transitionLeft() {
    SLIDER.classList.add('slide-right');
    BTN_PREV.removeEventListener('click', transitionLeft);
    BTN_PREV_MOBILE.removeEventListener('click', transitionLeft);
}

function transitionRight() {
    SLIDER.classList.add('slide-left');
    BTN_NEXT.removeEventListener('click', transitionRight);
}

SLIDER.addEventListener('transitionend', (event) => {
    if (event.target !== SLIDER) return;
    if (!SLIDER.classList.contains('slide-left') && !SLIDER.classList.contains('slide-right')) return;

    SLIDER.style.transition = 'none';
    SLIDER.classList.remove('slide-left');
    SLIDER.classList.remove('slide-right');
    switchCards();
    SLIDER.getBoundingClientRect();
    SLIDER.style.transition = '';
    BTN_PREV.addEventListener('click', transitionLeft);
    BTN_NEXT.addEventListener('click', transitionRight);
    BTN_PREV_MOBILE.addEventListener('click', transitionLeft);
});


/*Popup*/


const POPUP = document.querySelector('.pop-up');
const MODAL_WINDOW = document.querySelector('.pop-up__content');

SLIDER.addEventListener('click', (event) => {
    const card = event.target.closest('.pets__card');
    if (!card) return;

    const cardName = card.dataset.name;
    const currentCard = ALL_CARDS.find(obj => obj.name === cardName);

    MODAL_WINDOW.innerHTML = `
        <img src="${currentCard.img}" alt="${currentCard.name}">
        <div class="pop-up__text">
            <h3>${currentCard.name}</h3>
            <h4>${currentCard.type} - ${currentCard.breed}</h4>
            <h5>${currentCard.description}</h5>
            <ul>
                <li>Age: <span>${currentCard.age}</span></li>
                <li>Inoculations: <span>${currentCard.inoculations}</span></li>
                <li>Diseases: <span>${currentCard.diseases}</span></li>
                <li>Parasites: <span>${currentCard.parasites}</span></li>
            </ul>
        </div>
    `;

    POPUP.classList.remove('hidden');
    document.documentElement.classList.add('lock');
    
});

POPUP.addEventListener('click', (event) => {
    if (event.target.classList.contains('pop-up') || event.target.classList.contains('modal-btn')) {
        POPUP.classList.add('hidden');
        document.documentElement.classList.remove('lock');
    }
});