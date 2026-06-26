let cardsJson = [];
let multiCards = [];

async function petsCards() {
    const response = await fetch('script/pets.json');
    cardsJson = await response.json();
    multiCards = [...cardsJson, ...cardsJson, ...cardsJson, ...cardsJson, ...cardsJson, ...cardsJson];
    renderPetsCards(multiCards);
}

petsCards();
console.log(cardsJson);
const petsCard = document.querySelector('.pets__card');

function renderPetsCards() {

}