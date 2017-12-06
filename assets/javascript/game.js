// // // Functions  are Index 3 starting from line**********
// Index 1: Declaring VARS
// Index 2: Keyup Magic!!! What happens when user makes a letter guess.
// Index 3:  Functions code


// Index 1: Declaring VARS, empty ARRAYS, WordBank and Clues
var wins = 0;
var loss = 0;
var guess = 10;
var trash = [];
var wordBank = [
  'nelly', 'fiftycent', 'snoopdogg', 'bustarhymes', 'drake',
  'kanyewest', 'chamillionaire', 'liljon', 'lilwanye', 'richboy'
];

var clues = ['"St Lunatic"', '"G-Unit"', '"Bow Wow"', '"Whohaa"', '"Champange Papi"',
  '"Yezzus"', '"Ridin Dirty"', '"Yeeah"', '"Young Mula Baby"', '"Just bought a Cadillac"'
];
var gameBoard = [];
var randomArtistChosen = newArtist();
console.log(randomArtistChosen);



// Updates all the HTML id elements set at the beginning of the game
updateIds()


// Index 2: Keyup Magic!!! What happens when user makes a letter guess.
// Lines 33-60 are pretty much the game running. We start off with keyup listener event
// and log the event value to a var.  After that we clear the event.target.value.
inputBox.addEventListener("keyup", function(event) {
  var letterUserGuesses = event.target.value;
  event.target.value = '';
  console.log(letterUserGuesses);
  // He we test the event.value and make sure it is alphabet character.
  // if the letter is true we compare it again the indexOf the randomArtistChosen and if we
  // find it and make sure the letter isn't in the trash already. We push the letter to a index for letters
  // and our gameBoard.  That is the purpose of the findDisplay function
  if (/[A-Za-z]/.test(letterUserGuesses)) {
    var indexForLetters = []
    if (randomArtistChosen.indexOf(letterUserGuesses) > -1) {
      for (var i = 0; i < randomArtistChosen.length; i++) {
        if (randomArtistChosen[i] == letterUserGuesses && trash.indexOf(letterUserGuesses) == -1) {
          indexForLetters.push(i)
        }
        document.getElementById('game_board').innerHTML = gameBoard.join(' ');
      }
      findDisplay(indexForLetters, letterUserGuesses)
      // Function that tests if gameBoard when full is equal to the randomArtistChosen for the win
      winGame()
    } else {
      // Fuctions that push letter if not in randomLetterChosen index to trash and takes away
      // a guess.  If guess = 0 the user loses the game.
      lossGuessAndTrashPush(letterUserGuesses)
      loseGame()
    }
  }
});

// Index 3:  Functions code
//
// Fuction that resets game
function gameReset() {
  guess = 10;
  trash = [];
  gameBoard = [];
  randomArtistChosen = newArtist()
  document.getElementById('guesses_remaining').innerHTML = guess;
  document.getElementById('lettersUsed').innerHTML = trash;
  document.getElementById('game_board').innerHTML = gameBoard.join(' ');
  alert("Shall we pay again? ")
}

// Fuction that randomly chooses a new randomArtistChosen
function newArtist() {
  var letterIndex = (Math.floor(Math.random() * wordBank.length) + 0);
  console.log(letterIndex);
  for (i = 0; i < wordBank[letterIndex].length; i++) {
    gameBoard.push('_')
  }
  document.getElementById('clues').innerHTML = clues[letterIndex];
  return wordBank[letterIndex]
}

// Function that finds the letter and displays it to the gameBoard
// arrayindex=indexForLetters
// arrayletter=letterUserGuesses
function findDisplay(array, arrayletter) {
  for (var n = 0; n < array.length; n++) {
    console.log(array);
    gameBoard.splice(array[n], 1, arrayletter)
  }
  if (trash.indexOf(arrayletter) == -1) {
    trash.push(arrayletter)
    document.getElementById('lettersUsed').innerHTML = trash;
  }
  document.getElementById('game_board').innerHTML = gameBoard.join(' ');
}


// Fuction that pushes letter to trash and takes away a guess.
// arrayletter=letterUserGuesses
function lossGuessAndTrashPush(arrayletter) {
  if (trash.indexOf(arrayletter) == -1) {
    guess--
    document.getElementById('guesses_remaining').innerHTML = guess;
  }
  if (trash.indexOf(arrayletter) == -1) {
    trash.push(arrayletter)
    document.getElementById('lettersUsed').innerHTML = trash;
  }
}

// Fuction that determines if you win the game and what to do.
function winGame() {
  if (gameBoard.join('') === randomArtistChosen) {
    wins++
    document.getElementById('wins').innerHTML = wins;
    alert("You Win the word is " + randomArtistChosen)
    gameReset()
  }
}

// Fuction that determines if you lose the game and what to do.
function loseGame() {
  if (guess == 0) {
    loss++
    document.getElementById('loses').innerHTML = loss;
    alert("You Lose the word was " + randomArtistChosen);
    gameReset()
  }
}

// Fuction that updates the HTML IDs in the beginning of the game.
function updateIds() {
  document.getElementById('wins').innerHTML = wins;
  document.getElementById('loses').innerHTML = loss;
  document.getElementById('guesses_remaining').innerHTML = guess;
  document.getElementById('lettersUsed').innerHTML = trash;
  document.getElementById('game_board').innerHTML = gameBoard.join(' ');
}
