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
    this.cards.forEach(shuffle(){
      // generate random index of array to swap with
      var rand = Math.floor(Math.rand() * 52));
    };)
  }
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
