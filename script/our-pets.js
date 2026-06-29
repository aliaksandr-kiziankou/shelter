/*Burger Menu*/

const BURGER_BTN = document.querySelector('.burger-btn');
const BURGER_MENU = document.querySelector('.burger-menu');
const BURGER_WRAPPER = document.querySelector('.burger__wrapper');

BURGER_BTN.addEventListener('click', () => {
    BURGER_MENU.classList.toggle('burger_open');
    BURGER_BTN.classList.toggle('rotate');
    document.documentElement.classList.toggle('lock');
    BURGER_WRAPPER.classList.toggle('visible');
});

BURGER_MENU.addEventListener('click', (event) => {
    if (event.target.classList.contains('burger-link')) {
        BURGER_MENU.classList.remove('burger_open');
        document.documentElement.classList.remove('lock');
        BURGER_BTN.classList.remove('rotate');
        BURGER_WRAPPER.classList.remove('visible');
    }
});

BURGER_WRAPPER.addEventListener('click', (event) => {
    if (event.target.classList.contains('burger__wrapper')) {
        BURGER_MENU.classList.remove('burger_open');
        document.documentElement.classList.remove('lock');
        BURGER_BTN.classList.remove('rotate');
        BURGER_WRAPPER.classList.remove('visible');
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        BURGER_MENU.classList.remove('burger_open');
        BURGER_BTN.classList.remove('rotate');
        document.documentElement.classList.remove('lock');
        BURGER_WRAPPER.classList.remove('visible');
    }
});


/*Pets cards and pagination*/


const PETS_CARDS = document.querySelector('.pets__cards-container');
const START_BTN = document.querySelector('.start');
const PREV_BTN = document.querySelector('.prev-page');
const NEXT_BTN = document.querySelector('.next-page');
const END_BTN = document.querySelector('.end');
const PAGE_COUNTER = document.querySelector('.current-page h3');

let cardsJson = [];
let multiCards = [];
let currentPage = 1;
let maxPage;

async function fetchCards() {
    const response = await fetch('script/pets.json');
    cardsJson = await response.json();
    const shuffledJson = [...cardsJson.slice(cardsJson.length/2, cardsJson.length), ...cardsJson.slice(0, cardsJson.length/2)];
    multiCards = [...shuffledJson, ...cardsJson, ...shuffledJson, ...cardsJson, ...shuffledJson, ...cardsJson];
    renderPage(currentPage);
    updateButtonsStatus();
}

fetchCards();

function getCardsPerPage() {
    if (window.innerWidth < 768) return 3;
    if (window.innerWidth < 1024) return 6;
  return 8;
}

let lastCardsPerPage = getCardsPerPage();

window.addEventListener('resize', () => {
    const currentCardsPerPage = getCardsPerPage();

    if (lastCardsPerPage === currentCardsPerPage) return;

    lastCardsPerPage = currentCardsPerPage;

    if (currentPage > getMaxPage()) {
        currentPage = getMaxPage();
    }
    
    renderPage();
    pageCounter();
    updateButtonsStatus();
});

function renderPage() {
    const startCardIndex = (currentPage - 1) * getCardsPerPage();
    const currentPageCards = multiCards.slice(startCardIndex, startCardIndex + getCardsPerPage());

    PETS_CARDS.innerHTML = currentPageCards.map(card => `
        <div class="pets__page">
            <div class="pets__card" data-name="${card.name}">
                <div class="card__img">
                    <img src="${card.img}" alt="${card.name}">
                </div>
                <div class="card__text">
                    <p>${card.name}</p>
                </div>
                <button class="card__btn">Learn more</button>
            </div>
        </div>
    `).join('');
}

function pageCounter() {
    PAGE_COUNTER.textContent = currentPage;
}

function getMaxPage() {
    return Math.ceil(multiCards.length / getCardsPerPage());
}

function updateButtonsStatus() {
    PREV_BTN.classList.toggle('inactive', currentPage === 1);
    START_BTN.classList.toggle('inactive', currentPage === 1);

    NEXT_BTN.classList.toggle('inactive', currentPage === getMaxPage());
    END_BTN.classList.toggle('inactive', currentPage === getMaxPage());
}

function changePage(newPage) {
    PETS_CARDS.classList.add('fade-out');

    let handled = false;

    const handler = () => {
        if (handled) return;
        handled = true;

        currentPage = newPage;
        renderPage();
        pageCounter();
        updateButtonsStatus();
        PETS_CARDS.classList.remove('fade-out');
    };

    PETS_CARDS.addEventListener('transitionend', (event) => {
        if (event.propertyName !== 'opacity') return;
        handler();
    }, { once: true });

    setTimeout(handler, 600);
};

START_BTN.addEventListener('click', () => {
    if (currentPage === 1) return;

    changePage(1);
});

PREV_BTN.addEventListener('click', () => {
    if (currentPage === 1) return;

    changePage(currentPage - 1);
});

NEXT_BTN.addEventListener('click', () => {
    if (currentPage === getMaxPage()) return;

    changePage(currentPage + 1);
});

END_BTN.addEventListener('click', () => {
    if (currentPage === getMaxPage()) return;

    changePage(getMaxPage());
});


/*Popup*/


const POPUP = document.querySelector('.pop-up');
const MODAL_WINDOW = document.querySelector('.pop-up__content');
const PETS_CONTAINER = document.querySelector('.pets__cards-container');

PETS_CONTAINER.addEventListener('click', (event) => {
    const card = event.target.closest('.pets__card');
    if (!card) return;

    const cardName = card.dataset.name;
    const currentCard = cardsJson.find(obj => obj.name === cardName);

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