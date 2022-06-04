'use strict';

// Selecting elements
const btnAgain = document.querySelector('#btnAgain');
const btnGuess = document.querySelector('#btnGuess');
const messages = document.querySelector('#messages');
const number = document.querySelector('#number');
const guess = document.querySelector('#guess');
const scoreEl = document.querySelector('#score span');
const highScoreEl = document.querySelector('#highScore span');


// Initial conditions 

let randomNumber = Math.trunc( Math.random() * 20 ) + 1;
console.log(randomNumber);
let highScore = 0;
let score = 20;

scoreEl.textContent = 20;
highScoreEl.textContent = 0;

// Functions

const showMessage = function( message ) { //Show messages according what's going on 
  messages.textContent = message;
}

const showNumber = function() { //Display the hidden number
  number.style.width = '30rem';
  number.querySelector('span').textContent = randomNumber;
}

const switchBotton = function( mode ) { 

  if ( mode ) { //Turn on the botton guess
    btnGuess.disabled = false;
    btnGuess.style.cursor = 'pointer';
  } else { //Turn off the botton guess
    btnGuess.disabled = true;
    btnGuess.style.cursor = 'not-allowed'
  }

}

// Event Listeners

// When user tries with a number
btnGuess.addEventListener('click', function( e ) {

  e.preventDefault();

  const guessNumber = Number( guess.value );
  console.log( guessNumber );

  if ( guessNumber === '' || guessNumber <= 0 || guessNumber > 20 ) { // If user enters an invalid number
  
    showMessage('⛔ No es un número valido');

  } else if ( guessNumber === randomNumber ) { //If user enters correct number. Win the game!!

    showMessage('🏆 Tú ganaste el juego!');
    showNumber();
    document.querySelector('body').style.backgroundColor = '#60b347';
    switchBotton( 0 );

    if ( score >= highScore ) highScore = score; //Check if it was the best game 

  } else if ( guessNumber !== randomNumber ) { //If user enters an incorrect number
    
    if ( score !== 1 ) { //Check if there are some attempts

      showMessage(`Demasiado ${ guessNumber > randomNumber ? 'alto ☝' : 'bajo 👇'}`);
    
    } else { //Lose the game!!

      showMessage('Perdiste el juego! 😢');
      showNumber();
      switchBotton( 0 );
      document.querySelector('body').style.backgroundColor = '#d63031';
    }

    score--;
    scoreEl.textContent = score;
  } 

});

// This botton could be pressed either the user loses the game or at any moment.  
btnAgain.addEventListener('click', function( e ) {
  e.preventDefault();

  randomNumber = Math.trunc( Math.random() * 20 ) + 1;
  console.log(randomNumber);
  score = 20; 

  scoreEl.textContent = 20;
  highScoreEl.textContent = highScore;
  number.querySelector('span').textContent = '?';
  messages.textContent = 'Comienza a adivinar!...';
  guess.value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  switchBotton( 1 );

});