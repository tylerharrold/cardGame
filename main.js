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

// Create graphics and set default state based on game parameters and values
var nodeListOfCards = document.querySelectorAll(".card");
var cardGraphics = new CardGraphics(nodeListOfCards , NUMBER_OF_ROWS , CARDS_PER_ROW);
cardGraphics.applyGraphicsClass("card-inactive" , 0 , (NUMBER_OF_ROWS * CARDS_PER_ROW - (handsToPlay * CARDS_PER_ROW)));



var testDeck = new Deck();
testDeck.populateDeck(NUMBER_OF_SUITS , CARDS_PER_SUIT);
