/*
 *****************************************
  Class definitions, utility functions, and globals
 *****************************************
*/

/*********************** Globals *******************************/
var handsToPlay = 1; // number of hands to play (default of one hand)
var betPerHand =  1; // bet per hand (default of one unit)
var betCounter = 0; // variable to track times the bet button has been clicked
const valueOfBet = .05; // default value of a bet, this is constant
var money =  1.00; // money started with, cannot bet more than have Note: for testing this has been set to $10.00
var totalBet = 0.0; // variable for storing total value  of current bet

/*********************** Utility Functions *******************************/
// Initialize the game 'board'
function initialize(){
  refreshTotalBet(); // ensure  opening bet is  correct
  redisplayTotalMoney(); // display the total amount of money available  to player
  redisplayTotalBet(); // display the current total bet

  // set up and shuffle three decks
};

// refresh the total bet
function refreshTotalBet(){
  totalBet = valueOfBet * betPerHand * handsToPlay;
  // NOTE: CHANGE THE HTML DISPLAY IN THE SPAN THAT DOESN'T YET EXIST
};

// function to test if bet is allowable based on total money
function canAffordBet(){
  refreshTotalBet();
  //if bet doesn't surpass the money, return true
  // NOTE: because of this call, its letting the bet get higher than the  money
  return (totalBet <= money);
};

// Function to return a proper card suit
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
};

// Function to return a proper card name
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
};

/*********************** Classes *******************************/
// Card class
function Card(val , suit){
  this.val = val;
  this.suit  = suit;
  this.hold = false;  // sets to true if the card is being kept in a hand
  this.clone = function(){
    var cloneCard = new Card(this.val , this.suit);
    return cloneCard;
  };
  this.setValues = function(newVal , newSuit){
    this.val = newVal;
    this.suit = newSuit;
  };
};

// Deck class
function Deck(){
  // array of 52 cards
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
    // NOTE this should probably iterate a few times to increse how  thoroughly a deck is shuffled
    for(var i = 0 ; i < this.cards.length ; i++){
      //generate random index of array to swap with
      var randIndex = Math.floor(Math.random() * 52);
      //create a placeholder to store value of current index card
      var placeholderCard = card.clone();
      // set the values of the current index to those of the random index card
      card.setValues(this.cards[randIndex].val , this.cards[randIndex].suit);
      // set the values of the random index card to the temp stored values
      this.cards[randIndex].setValues(placeholderCard.val , placeholderCard.suit);
    }
  };
}

// Hand class
function Hand(){
  this.hand = [0 , 0 , 0 , 0 , 0]; // array of five (eventual) card objects
  this.handWinnings = 0; // winning for the hand (default 0)
  this.drawHand = function(deck){
    // save the first five cards from the shuffled deck into a hand
    for(var i = 0 ; i < 5 ; i++){
      this.hand[i] = deck[i].clone();
    }
    // remove the drawn cards from the deck
    deck.splice(0 , 5);
  };
  // NEED FUNCTION TO ANALYZE HAND AND TALLY PAYOUT
  // need a function to re-get
}

/*
 *****************************************
  Button Behavior/ HTML modifications
 *****************************************
*/

// function and callback to alter handsToPlay by button click
document.querySelector("#hands-to-play").addEventListener("click" , alterHands); // button listener
function alterHands(){
  // increase hand amount, if the total still passes check, break, otherwise, revert to  lowest
  switch(handsToPlay){
    case 1:
      handsToPlay = 2;
      if(canAffordBet()){
        break;
      }
      else{
        resetHandLoop();
        break;
      }
    case 2:
      handsToPlay = 3;
      if(canAffordBet()){
        break;
      }
      else{
        resetHandLoop();
        break;
      }
      break;
    case 3:
      resetHandLoop();
      break;
    }

  // change the display of button, and total bet tracker
  document.querySelector("#hands-to-play").textContent = "Hands to Play: " + handsToPlay;
  redisplayTotalBet();
};
// utility function to reduce  repeated code in alterHands switch statement
function resetHandLoop(){
  handsToPlay = 1;
  refreshTotalBet();
};


// function and  callback to alter betPerHand by button click
document.querySelector("#bet-per-hand").addEventListener("click" , alterBet); // listener
function alterBet(){
  // increment betPerHand or loop back down if new total doens't pass check

  switch(betPerHand){
    case 1:
      betPerHand = 2;
      if(canAffordBet()){
        break;
      }
      else{
        resetBetLoop();
        break;
      }
    case 2:
      betPerHand = 3;
      if(canAffordBet()){
        break;
      }
      else{
        resetBetLoop();
        break;
      }
    case 3:
      betPerHand = 5;
      if(canAffordBet()){
        break;
      }
      else{
        resetBetLoop();
        break;
      }
    case 5:
      betPerHand  = 10;
      if(canAffordBet()){
        break;
      }
      else{
        resetBetLoop();
        break;
      }
    case 10:
      resetBetLoop();
      break;
  }
  // change the display of button, redisplay total bet
  document.querySelector("#bet-per-hand").textContent = "Bet Per Hand: " + betPerHand;
  redisplayTotalBet();
};
// utility function to reduce  repeated code in alterHands switch statement
function resetBetLoop(){
  betPerHand = 1;
  refreshTotalBet();
};

// fucntion and callback for deal button
// button click event listener
document.querySelector("#deal").addEventListener("click" , dealFirstHand) // listener

// function to set totalBet display
function redisplayTotalBet(){
  document.querySelector("#total-bet").textContent = "Total Bet: " + totalBet.toFixed(2);
};

// function to set totalMoney display
function redisplayTotalMoney(){
  document.querySelector("#total-money").textContent = "Total Money: " + money.toFixed(2);
};

// function to set callback for  button-clickable  class  (gets called after first deal)
function setCardSelectable(cardSelectable){
  // acquire node list of all clickable cards
  // cardSelectable = document.querySelectorAll(".card-selectable");
  // loop through node list and add callback to it
  for(var i = 0 ; i < cardSelectable.length ; i++){
    cardSelectable[i].addEventListener("click" , holdCard);
  }
};
// function for when card is selected (NOTE needs better comment plz)
function holdCard(){
  // set card hold value true, and then clone card in mirror spot in other hands
  // add class of card selected to change the style noticably
  this.classList.toggle("card-held");
};



/*
 *****************************************
  Game Logic
 *****************************************
*/
// testing function can be deleted later
function displayNodeNumber(){
  var list = document.querySelectorAll(".card");

  for(var i = 0 ; i < list.length ; i++){
    list[i].querySelector("p").textContent = i + 1;
  }
}

// initialize 'game screen'
initialize();

// NOTE test loop
// On page load, create 3 decks for each row of cards and the first hand
// deck for testing can be deleted later
var deckOne = new Deck();
deckOne.populateDeck();
deckOne.shuffleDeck();

var handOne = new Hand();

var cardSelectableNodeList = document.querySelectorAll(".card-selectable");
setCardSelectable(cardSelectableNodeList); // NOTE FOR TEST DELETE


// function to deal out first hand
function dealFirstHand(){
  // draw hand and remove drawn cards from deck
  handOne.drawHand(deckOne.cards);
  // display the five cards on the node list of dirs
  var cardNodeList = document.querySelectorAll(".card");
  for(var i = 10 ; i < cardNodeList.length ; i++){
    var content = handOne.hand[i - 10].val + " of " + handOne.hand[i - 10].suit;
    cardNodeList[i].querySelector("p").textContent = content;
  }
};

// game loop
  // eventual function to check if the money is  enough to do even a 1 hand 1 bet bet, if not deactivate all
    // until  there is
  // initialize function that  sets everything up
    // create three decks
    // ensure all but one hand is 'greyed out'
  // allow user to set bet
  // when user clicks deal, create hand and remove hand from shuffled deck 1
    // populate first row with hand
    // remove the option to bet or increase hands
  // let user click cards to select 'keepers' those 'keepers' populate in above rows
  // clicking deal again removed all non-keep cards from hands and re-deals new cards from each deck
