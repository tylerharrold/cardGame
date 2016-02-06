// Hand class
function Hand(){
  // NOTE consider making a non-deck 'generic' card that actually has the properties of a card
  //      that can be a placeholder other than zero (this should remove the need for the dual hasOwnProperty checks)
  this.hand = [0 , 0 , 0 , 0 , 0]; // array of five (eventual) card objects
  this.handWinnings = 0; // winning for the hand (default 0)
  this.drawHand = function(deck){
    // save the first five cards from the shuffled deck into a hand
    for(var i = 0 ; i < 5 ; i++){
      this.hand[i] = deck.drawTopCard();
    }
  };
  // function that draws specific card from specific deck and places in specifc index
  this.mirrorCard = function(handIndex , deckObj , cardObj){
    // if there is no card object at index, put specified card object there
    if(this.hand[handIndex] === 0){
      this.hand[handIndex] =  deckObj.drawSpecificCard(cardObj);
      this.hand[handIndex].toggleHold();
    }
    else{
      // set the hold value of card to false
      this.hand[handIndex].toggleHold();
      // push card back into deck
      deckObj.receiveCard(this.hand[handIndex]);
      // make slot equal to 0 again
      this.hand[handIndex]  =  0;
    }
  };
  this.sortHand = function(){

  };
};
