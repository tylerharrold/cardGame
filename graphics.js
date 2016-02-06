/* CARDGRAPHICS CLASS
      This class represents every card on screen graphically. It should be
    instanced by receiving a complete node list of all the members of html class
    ".card"

      NOTE I'm not sure if this will work currently, but it should receiveCard
    references to the cards in each hand, and know to print them in the correct
    spot in the array regardless of how the hand is organized

*/

function CardGraphics(nodeList , rowCount, columnCount)
{
  this.nodeList = nodeList; // gives us control over the node list of cards
  this.rowCount = rowCount;
  this.columnCount = columnCount;

  // function to receive references to cards in a hand

}


/*
  NOTE: WHAT DOES THIS CLASS NEED TO DO

    - I need control over the nodeList of all cards from one convenient spot (DONE)
    - Each member of the node list needs to get a card from a hand
      - but this card could change on redeal if the card isn't held
*/
