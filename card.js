// Card class
function Card(suit , face){
  this.suitVal  = suit;
  this.faceVal = face;
  this.hold = false;  // sets to true if the card is being kept in a hand

  // returns a copy of the card
  this.clone = function(){
    var cloneCard = new Card(this.returnSuitVal() , this.returnFaceVal());
    return cloneCard;
  };

  this.setValues = function(newface , newSuit){
    this.faceVal = newface;
    this.suitVal = newSuit;
  };

  // return face
  this.returnFaceVal = function(){return this.faceVal};

  // return suit
  this.returnSuitVal  = function(){return this.suitVal};

  // //OBSOLETE DELETE function to return string based on card face and suit
  // this.returnFaceValues = function(){
  //   return this.faceVal + this.suitVal;
  // };

  this.printCardString = function(){
    return "Face: " + this.faceVal + " Suit: " + this.suitVal;
  };

  this.toggleHold = function(){
    this.hold = !this.hold;
  };
};
