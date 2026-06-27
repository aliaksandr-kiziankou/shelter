/*Burger Menu*/

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
        document.body.classList.remove('lock');
        BURGER_BTN.classList.remove('rotate');
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        BURGER_MENU.classList.remove('burger_open');
        BURGER_BTN.classList.remove('rotate');
        document.body.classList.remove('lock');
    }
});


/*Pets cards render*/


let cardsJson = [];
let multiCards = [];

async function fetchCards() {
    const response = await fetch('script/pets.json');
    cardsJson = await response.json();
    multiCards = [...cardsJson, ...cardsJson, ...cardsJson, ...cardsJson, ...cardsJson, ...cardsJson];
    renderPetsCards(multiCards);
}

fetchCards();

const PETS_CARDS = document.querySelector('.pets__cards-container');

function renderPetsCards() {
    PETS_CARDS.innerHTML = multiCards.map(card => `
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