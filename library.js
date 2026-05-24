const container =
  document.getElementById("deckContainer");

const decks =
  JSON.parse(localStorage.getItem("flashcardDecks")) || [];

if(decks.length === 0){

  container.innerHTML =
    "<p>No decks created yet.</p>";

}

decks.forEach(deck => {

  const div = document.createElement("div");

  div.className = "deck-card";

  div.innerHTML = `
    <h3>${deck.title}</h3>
    <p>${deck.cards.length} cards</p>
    <p>${deck.createdAt}</p>
  `;

  div.addEventListener("click", () => {

    window.location.href =
      `viewer.html?id=${deck.id}`;

  });

  container.appendChild(div);

});
