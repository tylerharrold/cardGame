/* MAIN

  - calls a setup function to make sure variables are correct for load

  - graphics are set to default (each card node points to back of card image)

  - we wait for deal

  - first deal
    - three decks are created shuffled
    - three hands are created
    - our first hand is delt
    - graphics are updated
      - cardgraphic nodes in last row get references to cards in hand
      - graphics are "drawn"

*/


// Initialize Game
initialize();

// Create graphics
var nodeListOfCards = document.querySelectorAll(".card");
var cardGraphics = new CardGraphics(nodeListOfCards , NUMBER_OF_ROWS , COLUMNS_PER_ROW);


var testDeck = new Deck();
testDeck.populateDeck(NUMBER_OF_SUITS , CARDS_PER_SUIT);
