'use strict';
const api = require('./auth/api');
const ui = require('./auth/ui');
const store = require('./store');

const board = ['', '', '', '', '', '', '', '', ''];

let currentPlayer = 'X';

const blinkMe = function() {
  (function blink() {

        $('.win').fadeOut(500).fadeIn(500);
      })();
};

const checkWins = function() {
  if (
    board[0] === "X" && board[1] === "X" && board[2] === "X" ||
    board[3] === "X" && board[4] === "X" && board[5] === "X" ||
    board[6] === "X" && board[7] === "X" && board[8] === "X" ||
    board[0] === "X" && board[4] === "X" && board[8] === "X" ||
    board[2] === "X" && board[4] === "X" && board[6] === "X" ||
    board[0] === "X" && board[3] === "X" && board[6] === "X" ||
    board[1] === "X" && board[4] === "X" && board[7] === "X" ||
    board[2] === "X" && board[5] === "X" && board[8] === "X"
  ) {


    $('.win').text("X won!");

    blinkMe();
    // console.log('X won');
    return true;

  } else if (
    board[0] === "O" && board[1] === "O" && board[2] === "O" ||
    board[3] === "O" && board[4] === "O" && board[5] === "O" ||
    board[6] === "O" && board[7] === "O" && board[8] === "O" ||
    board[0] === "O" && board[4] === "O" && board[8] === "O" ||
    board[2] === "O" && board[4] === "O" && board[6] === "O" ||
    board[0] === "O" && board[3] === "O" && board[6] === "O" ||
    board[1] === "O" && board[4] === "O" && board[7] === "O" ||
    board[2] === "O" && board[5] === "O" && board[8] === "O"
  ) {
    $('.win').text("O won!");
    blinkMe();
    // console.log('O won');
    return true;

  } else if (board.includes('') === false) {
    $('.win').text("DRAW");
    blinkMe();
    // console.log('DRAW');
    return true;
  } return false;

};

let boxes = $('.box');

let turns = function() {
    if (checkWins() === true) {
      boxes.off('click');
    }
    if (currentPlayer === "X") {
      currentPlayer = "O";
    } else {
      currentPlayer = "X";
    }

};



const resetGameBoard = function() {
  for (let i = 0; i < board.length; i++) {
    board[i] = '';
    $('.box').text('');
    $('.win').text('');
    currentPlayer = 'X';
  }
  boxes.on('click', function(event) {
    if ($(event.target).text() === '') {
      $(event.target).text(currentPlayer);
      board[(event.target.id)] = currentPlayer;
      // console.log(board);
      api.patchGame(store.game.id, event.target.id, currentPlayer, checkWins());
      // .then(ui.success)
      // .catch(ui.failure);
      turns();
    }

  });
};



const onCreateGame = function(event){
  event.preventDefault();
   resetGameBoard();
       api.createGame()
      .then((response) => {
        store.game = response.game;
      })
      .then(ui.createGameSuccess)
      // .catch(ui.failure)
      ;
};





// var gameOver boolen


module.exports = {
  currentPlayer,
  checkWins,
  board,
  resetGameBoard,
  turns,
  // showText,
  onCreateGame,
};
