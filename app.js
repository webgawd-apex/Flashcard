const generateBtn = document.getElementById("generateBtn");

generateBtn.addEventListener("click", () => {

  const text = document.getElementById("inputText").value;

  const title =
    document.getElementById("deckTitle").value || "Untitled Deck";

  const cards = parseFlashcards(text);

  if(cards.length === 0){
    alert("No valid flashcards found.");
    return;
  }

  const deck = {
    id: Date.now(),
    title,
    cards,
    createdAt: new Date().toLocaleString()
  };

  let decks =
    JSON.parse(localStorage.getItem("flashcardDecks")) || [];

  decks.unshift(deck);

  localStorage.setItem(
    "flashcardDecks",
    JSON.stringify(decks)
  );

  window.location.href =
    `viewer.html?id=${deck.id}`;

});

function parseFlashcards(text){

  const cards = [];

  const regex =
    /Front:(.*?)Back:(.*?)(?=Front:|$)/gis;

  let match;

  while((match = regex.exec(text)) !== null){

    cards.push({
      front: match[1].trim(),
      back: match[2].trim()
    });

  }

  return cards;

}
