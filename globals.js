/*********************** Globals *******************************/
var handsToPlay = 1; // number of hands to play (default of one hand)
var betPerHand =  1; // bet per hand (default of one unit)
var betCounter = 0; // variable to track times the bet button has been clicked
const valueOfBet = .05; // default value of a bet, this is constant
var money =  1.00; // money started with, cannot bet more than have Note: for testing this has been set to $10.00
var totalBet = 0.0; // variable for storing total value  of current bet
var dealtOnce =  false; // sentinel for whether deal has been clicked or not

const NUMBER_OF_ROWS = 3;
const CARDS_PER_ROW = 5;
const CARDS_PER_SUIT = 13;
const NUMBER_OF_SUITS = 4;
const SHUFFLES = 5;
const IMG_PATH = "../cardGameAssets/";

// enum type object to keep deck and hand arrays more readable
 const ROW = {
  ONE: 0 ,
  TWO: 1 ,
  THREE: 2
};

const SUIT = {
  HEARTS: 0,
  DIAMONDS: 1,
  CLUBS: 2,
  SPADES: 3
}

const FACE = {
  ACE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
  SIX: 6,
  SEVEN: 7,
  EIGHT: 8,
  NINE: 9,
  TEN: 10,
  JACK: 11,
  QUEEN: 12,
  KING: 13
}
