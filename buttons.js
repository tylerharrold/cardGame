/*
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  Buttons and Interactables
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    This section details the setup and behavior of buttons and interactable
  objects on the game screen. File is organized by a callback setter followed
  immediately by the definition of its callback function.

  Author: Tyler Harrold
*/

/*
  Hands to Play Button
    Button increments the number of hands to play (minimum hand of one).
    An graphics update is called whenever the button is clicked such that
    the class ".card-inactive" is added to cards in rows not being used.
*/

document.querySelector("#hands-to-play").addEventListener("click" , alterHands); // button listener

function alterHands(){
  // Increase hand amount (if increases over three, rolls back to 1)
  handsToPlay = (handsToPlay % 3) + 1;
  // Check to see if, after the increase, the bet is affordable, if not roll back
  if(!canAffordBet()){
    handsToPlay = 1;
    refreshTotalBet();
  }
  // Update button displays
  document.querySelector("#hands-to-play").textContent = "Hands to Play: " + handsToPlay;
  redisplayTotalBet();

  // Update graphics
  // NOTE this is hard coded and bad, but as of writing, i have no understanding
  // of how to call to graphics class from this call back function
  cardGraphics.applyGraphicsClass("card-inactive" , 0 , (NUMBER_OF_ROWS * CARDS_PER_ROW - (handsToPlay * CARDS_PER_ROW)));
};
