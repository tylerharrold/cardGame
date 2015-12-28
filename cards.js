function returnSuitBasedOnLoopValue(val){
  switch (val){
    case 0:
      return "hearts";
    case 1:
      return "diamonds";
    case 2:
      return "clubs";
    case 3:
      return "spades";
  }
}

function returnNumberBasedOnLoopValue(val){
  switch(val){
    case 1:
      return "Ace";
    case 11:
      return "Jack";
    case 12:
      return "Queen";
    case 13:
      return "King";
    default:
      return val;
  }
}

function Card(val , suit){
  this.val = val;
  this.suit  = suit;
  this.clone = function(){
    var cloneCard = new Card(this.val , this.suit);
    return cloneCard;
  };
  this.setValues = function(newVal , newSuit){
    this.val = newVal;
    this.suit = newSuit;
  };
};

function Deck(){
  // create an array of cards
  this.cards =  [];
  this.populateDeck = function(){
    for(var i = 0 ; i < 4 ; i++){
      var suit = returnSuitBasedOnLoopValue(i);
      for(var k = 1 ; k <= 13 ; k++){
        card = new Card(returnNumberBasedOnLoopValue(k) , suit);
        this.cards.push(card);
      }
    }
  };
  this.printDeck = function(){
    for(var i = 0 ; i < this.cards.length ; i++){
      console.log(this.cards[i].val + " of " + this.cards[i].suit);
    }
  };
  this.shuffleDeck = function(){
    this.cards.forEach(
      function(card){
        // generate random index of array to swap with
        var randIndex = Math.floor(Math.rand() * 52);
        // create a placeholder to store value of current index card
        var placeholderCard = card.clone();
        // set the values of the current index to those of the random index card
        card.setValues(this.cards[randIndex].val , this.cards[randIndex].suit);
        // set the values of the random index card to the temp stored values
        this.cards[randIndex].setValues(placeholderCard.val , placeholderCard.suit);
      }
    );
  };
}

var deck = new Deck();
deck.populateDeck();

function displayNodeNumber(){
  var list = document.querySelectorAll(".card");

  for(var i = 0 ; i < list.length ; i++){
    list[i].querySelector("p").textContent = i + 1;
  }
}

document.querySelector("button").addEventListener("click" , displayNodeNumber)
