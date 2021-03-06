// NOTE for future builds:
/*
  - Would like to use for each when possible? probably cleaner
  - perhaps build a wildcard function into this?

*/

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
var dealtOnce =  false; // sentinel for whether deal has been clicked or not

// enum type object to keep deck and hand arrays more readable
 const ROW = {
  ONE: 0 ,
  TWO: 1 ,
  THREE: 2
};
/*********************** Utility Functions *******************************/
// Initialize the game 'board'
function initialize(){
  refreshTotalBet(); // ensure  opening bet is  correct
  redisplayTotalMoney(); // display the total amount of money available  to player
  redisplayTotalBet(); // display the current total bet
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
      return "heart";
    case 1:
      return "diamond";
    case 2:
      return "club";
    case 3:
      return "spade";
  }
};

// Function to return a proper card name
function returnNumberBasedOnLoopValue(val){
  switch(val){
    case 1:
      return "a";
    case 11:
      return "j";
    case 12:
      return "q";
    case 13:
      return "k";
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
  // return val
  this.returnVal = function(){return this.val};
  // return suit
  this.returnSuit  = function(){return this.suit};
  //function to return string based on card val and suit
  this.returnFaceValues = function(){
    return this.val + this.suit;
  };
  this.toggleHold = function(){
    this.hold = !this.hold;
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
    // NOTE this actually shuffles deck three times
    for(var k = 0 ; k < 5 ; k++){
      for(var i = 0 ; i < this.cards.length ; i++){
        //generate random index of array to swap with
        var randIndex = Math.floor(Math.random() * this.cards.length);
        //create a placeholder to store value of current index card
        var placeholderCard = card.clone();
        // set the values of the current index to those of the random index card
        card.setValues(this.cards[randIndex].val , this.cards[randIndex].suit);
        // set the values of the random index card to the temp stored values
        this.cards[randIndex].setValues(placeholderCard.val , placeholderCard.suit);
      }
    }
  };
  this.drawTopCard = function(){
    // retuns the actual object spliced out (as opposed to array of one containing it)
    return this.cards.splice(0 , 1)[0];
  };
  this.drawSpecificCard = function(cardObj){
    // search entire deck for card that matches both props of cardObj
    for(var i = 0 ; i < this.cards.length ; i++){
      if(this.cards[i].returnVal() === cardObj.returnVal() && this.cards[i].returnSuit() === cardObj.returnSuit()){
        // retuns the actual object spliced out (as opposed to array of one containing it)
        return this.cards.splice(i , 1)[0];
      }
    }
  };
  this.receiveCard = function(cardObj){
    this.cards.push(cardObj);
  }
};

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

/*
 *****************************************
  Hand Reader for Rewards
 *****************************************
*/
function readHand(arrayOfCards){
  var isFlush = checkForFlush(arrayOfCards);
  var isStraight = false;

  // if isFlush and isStraight are true
    // check to see if royal
    // else award straight flush

  // if fourofkind?
    // award is four of  kind

  // full house
  // flush
  // straight
  // three of a kind
  // one pair = money back
};

// Function checkForFlush takes a hand of Cards and sees if its
function checkForFlush(handToCheck){
  var isFlush = true;
  for(var i = 0 ; i < handToCheck.length - 1 ; i++){
    if(handToCheck[i].returnSuit() === handToCheck[i + 1]){
      // flush is still accurate
    }
    else{
      return false;
    }
  }
  return isFlush; // comments
};

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
document.querySelector("#deal").addEventListener("click" , dealCards) // listener
function dealCards(){
  // if not previously dealtOnce
  if(!dealtOnce){
    // create and draw hand and remove drawn cards from first (alredy shuffled) deck
    handArray[ROW.THREE].drawHand(deckArray[ROW.THREE]);
    // assign each card in the hand to a card node item
    for(i = 10 ; i < allCardVectors.length ; i++){
      allCardVectors[i].associatedCard = handArray[ROW.THREE].hand[i - 10];
    }
    // update card nodes that have associated cards
    redrawCards(allCardVectors);

    // now that first row of cards are dealtOnce, we can click them
    makeCardsSelectable(allCardVectors);

    // makedealtOnce true
    dealtOnce = true;
  }
  else{
    // if this is the second time clicking deal...

    // shuffle the remaining cards in all dekcs (cards have been pulled out potentially)
    for(var i = 0 ; i < 3 ; i++){
      deckArray[i].shuffleDeck();
    }
    // if the val at each index in the hand array is 0 (i.e. no card),
    // NOTE this is a messy workaround, should be cleaner, but for the sake of gettin' it workin....
    for(var i = 0 ; i < 3 ; i++){
      for(var k = 0 ; k < 5 ; k++){
        if(handArray[i].hand[k] === 0){
          // replace with drawn card from corresponding deck
          handArray[i].hand[k] = deckArray[i].drawTopCard();
        }
        else if(handArray[i].hand[k].hold === false){
          handArray[i].hand[k] = deckArray[i].drawTopCard();
        }
        else{
          // the hold value is true, do nothing
        }
      }
    }

    redrawCards(allCardVectors);
    // ganme has run its course, each hand should be ckecked for winning hands

  }
};

// function to set totalBet display
function redisplayTotalBet(){
  document.querySelector("#total-bet").textContent = "Total Bet: " + totalBet.toFixed(2);
};

// function to set totalMoney display
function redisplayTotalMoney(){
  document.querySelector("#total-money").textContent = "Total Money: " + money.toFixed(2);
};

// function to set callback on each card-clickable  class  (gets called after first deal)
function makeCardsSelectable(cardSelectables){
  // loop through selectable cards and add callback to THIRD ROW ONLY
  for(var i = 10 ; i < cardSelectables.length ; i++){
    cardSelectables[i].addEventListener("click" , clickCard);
  }
};

// CALLBACK FUNCTION for when card is selected
function clickCard(){
  // make clicked card and cards directly above it style of card-held
  toggleCardHeldAppearance(this.columnNum);

  // for each other hand, mirror the value of this clicked card
  for(var i = 0 ; i < handArray.length - 1 ; i++){
    handArray[i].mirrorCard(this.columnNum , deckArray[i] , allCardVectors[this.columnNum + 10].associatedCard ); // try this.associatedCard
  }

  // toggle the hold value of the card clicked
  handArray[ROW.THREE].hand[this.columnNum].toggleHold();

  // then redraw cards
  redrawCards(allCardVectors);
};

// function to toggle css appearance of clicked (held) cards in specified column
function toggleCardHeldAppearance(num){
  for(var i = num ; i < 15 ; i+= 5){
    allCardVectors[i].classList.toggle("card-held");
  }
};

function toggleCardHeldValues(num){
  for(var i = num ; i < 10 ; i+= 5){

  }
}

// Redraw each card in the allCardVectors node list (according to their corresponding card)
function redrawCards(nodeList){
  // loop through all card vectors
  for(var i = 0 ; i < nodeList.length ; i++){
    // if associated card has 0 in index of hand array, draw Hold
    if(handArray[Math.floor(i / 5)].hand[i % 5] === 0){
      nodeList[i].querySelector("p").textContent = "Hold";
    }
    else{
      // else draw the return value of card at index
      nodeList[i].querySelector("p").textContent = handArray[Math.floor(i / 5)].hand[i % 5].returnFaceValues();
    }

  }
};


/*
 *****************************************
  Game Logic
 *****************************************
 */
// initialize 'game screen'
initialize();

// node list of ALL cards
var allCardVectors = document.querySelectorAll(".card");
// assign all cards a columnNumber
for(var i = 0 ; i < allCardVectors.length ; i++){
  allCardVectors[i].columnNum = i % 5;
}


// NOTE here we should only create decks and hands for the number of hands opted to play
// create array of decks to use in the game
var deckArray = [new Deck() , new Deck() , new Deck()]; // create necessary decks
for(var i = 0 ; i < deckArray.length ; i++){
  deckArray[i].populateDeck(); // populate each deck
}
deckArray[ROW.THREE].shuffleDeck(); // shuffle the deck used in first deal

// create array of hands to use in the game
var handArray = [new Hand() , new Hand() , new Hand()];


// test change for git commit



// game loop
  // eventual function to check if the money is  enough to do even a 1 hand 1 bet bet, if not deactivate all
    // until  there is
// initialize game screen
// create three decks, shuffle the first, hold the rest (will be shuffled after held cards are removed);
// NOTE greyed out for test in favor of deck array
// var deckOne = new Deck();
// deckOne.populateDeck(); // NOTE should be one line function that does both
// deckOne.shuffleDeck();
// var deckTwo = new Deck();
// deckTwo.populateDeck();
// var deckThree = new Deck();
// deckThree.populateDeck();
// NOTE uncomment up to here if all goes awful



    // ensure all but one hand is 'greyed out'
  // allow user to set bet
// when user clicks deal, create hand and remove hand from shuffled deck 1
// var handOne = new Hand();
// var handTwo =  new Hand();
// var handThree = new Hand();
    // populate first row with hand
    // remove the option to bet or increase hands
  // let user click cards to select 'keepers' those 'keepers' populate in above rows
  // clicking deal again removed all non-keep cards from hands and re-deals new cards from each deck
