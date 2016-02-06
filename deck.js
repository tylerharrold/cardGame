// Deck class
function Deck(){
  // array of 52 cards
  this.cardsInDeck =  [];

  // instance all the cards that belong in the deck and add to cardsInDeck
  this.populateDeck = function(numberOfSuits , cardsPerSuit){
    for(var i = 0 ; i < numberOfSuits ; i++){
      for(var k = 1 ; k <= cardsPerSuit ; k++){
        card = new Card(i , k);
        this.cardsInDeck.push(card);
      }
    }
  };

  // NOTE mostly for testing, can be DELETED later
  this.printDeck = function(){
    for(var i = 0 ; i < this.cardsInDeck.length ; i++){
      console.log(this.cardsInDeck[i].printCardString());
    }
  };

  // shuffles the deck
  this.shuffleDeck = function(numberOfShuffles){
    // NOTE this actually shuffles deck five times
    for(var k = 0 ; k < numberOfShuffles ; k++){
      for(var i = 0 ; i < this.cardsInDeck.length ; i++){
        //generate random index of array to swap with
        var randIndex = Math.floor(Math.random() * this.cardsInDeck.length);
        //create a placeholder to store value of current index card
        var placeholderCard = this.cardsInDeck[i].clone();
        // set the values of the current index to those of the random index card
        this.cardsInDeck[i].setValues(this.cardsInDeck[randIndex].returnFaceVal() , this.cardsInDeck[randIndex].returnSuitVal());
        // set the values of the random index card to the temp stored values
        this.cardsInDeck[randIndex].setValues(placeholderCard.returnFaceVal() , placeholderCard.returnSuitVal());
      }
    }
  };

  
  this.drawTopCard = function(){
    // retuns the actual object spliced out (as opposed to array of one containing it)
    return this.cardsInDeck.splice(0 , 1)[0];
  };
  this.drawSpecificCard = function(cardObj){
    // search entire deck for card that matches both props of cardObj
    for(var i = 0 ; i < this.cardsInDeck.length ; i++){
      if(this.cardsInDeck[i].returnVal() === cardObj.returnVal() && this.cardsInDeck[i].returnSuit() === cardObj.returnSuit()){
        // retuns the actual object spliced out (as opposed to array of one containing it)
        return this.cardsInDeck.splice(i , 1)[0];
      }
    }
  };
  this.receiveCard = function(cardObj){
    this.cardsInDeck.push(cardObj);
  }
};
