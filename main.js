'use strict';

// selecting elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const h1 = document.querySelector('.h1');
const player = document.querySelector('.player');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// for restart & starting
const init = function () {
  // starting conditions
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // visible part
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  // remove winner class
  diceEl.classList.add('hidden');
  h1.classList.remove('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  // if now active player is 0 switch it to 1
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// rolling dice functionality
btnRoll.addEventListener('click', function () {
  // it work's only when we are playing
  if (playing) {
    // 1. generating a random number
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `./img/dice-${dice}.png`;

    // 3.check for rolled
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      // who is active
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  // it work's only when we are playing
  if (playing) {
    // 1. add current score to active player's score
    // activeplayer is going to act like index of scores
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. check if player's score is >=100
    if (scores[activePlayer] >= 10) {
      // finish the game
      // set playing bolean to false
      playing = false;
      // adding winner class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      // remove player active
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      // remove dice pic
      diceEl.classList.add('hidden');
      h1.classList.add('hidden');
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
});

// reseting the game
btnNew.addEventListener('click', init);
