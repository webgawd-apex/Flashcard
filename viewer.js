const params = new URLSearchParams(window.location.search);

const deckId = params.get("id");

const decks =
  JSON.parse(localStorage.getItem("flashcardDecks")) || [];

const deck =
  decks.find(d => d.id == deckId);

if(!deck){

  alert("Deck not found.");

  window.location.href = "index.html";

}

document.getElementById("deckName").textContent =
  deck.title;

const flashcard =
  document.getElementById("flashcard");

const frontEl =
  document.querySelector(".flashcard-front");

const backEl =
  document.querySelector(".flashcard-back");

const counter =
  document.getElementById("cardCounter");

let current = 0;

function renderCard(){

  flashcard.classList.remove("flipped");

  frontEl.textContent =
    deck.cards[current].front;

  backEl.textContent =
    deck.cards[current].back;

  counter.textContent =
    `${current + 1} / ${deck.cards.length}`;

}

renderCard();

flashcard.addEventListener("click", () => {

  flashcard.classList.toggle("flipped");

});

document.getElementById("nextBtn")
.addEventListener("click", () => {

  if(current < deck.cards.length - 1){

    current++;

    renderCard();

  }

});

document.getElementById("prevBtn")
.addEventListener("click", () => {

  if(current > 0){

    current--;

    renderCard();

  }

});

document.getElementById("shareBtn")
.addEventListener("click", async () => {

  const shareURL = window.location.href;

  if(navigator.share){

    await navigator.share({
      title: deck.title,
      text: "Study this flashcard deck",
      url: shareURL
    });

  } else {

    navigator.clipboard.writeText(shareURL);

    alert("Link copied.");

  }

});
