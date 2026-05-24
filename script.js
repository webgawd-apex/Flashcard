// script.js

const inputText = document.getElementById("inputText");
const generateBtn = document.getElementById("generateBtn");

const flashcardSection = document.getElementById("flashcardSection");

const flashcard = document.getElementById("flashcard");

const frontEl = document.querySelector(".flashcard-front");
const backEl = document.querySelector(".flashcard-back");

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

const cardCounter = document.getElementById("cardCounter");

let flashcards = [];
let currentCard = 0;

generateBtn.addEventListener("click", () => {

  const text = inputText.value;

  flashcards = parseFlashcards(text);

  if(flashcards.length === 0){
    alert("No valid flashcards found.");
    return;
  }

  currentCard = 0;

  flashcardSection.classList.remove("hidden");

  showCard();

});

function parseFlashcards(text){

  const cards = [];

  const regex = /Front:(.*?)Back:(.*?)(?=Front:|$)/gis;

  let match;

  while((match = regex.exec(text)) !== null){

    const front = match[1].trim();
    const back = match[2].trim();

    if(front && back){

      cards.push({
        front,
        back
      });

    }

  }

  return cards;

}

function showCard(){

  flashcard.classList.remove("flipped");

  frontEl.textContent = flashcards[currentCard].front;
  backEl.textContent = flashcards[currentCard].back;

  cardCounter.textContent = `${currentCard + 1} / ${flashcards.length}`;

}

flashcard.addEventListener("click", () => {

  flashcard.classList.toggle("flipped");

});

nextBtn.addEventListener("click", () => {

  if(currentCard < flashcards.length - 1){

    currentCard++;

    showCard();

  }

});

prevBtn.addEventListener("click", () => {

  if(currentCard > 0){

    currentCard--;

    showCard();

  }

});
