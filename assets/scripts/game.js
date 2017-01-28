'use strict';
const api = require('./auth/api');
const ui = require('./auth/ui');
const store = require('./store');

const board = ['', '', '', '', '', '', '', '', ''];

let currentPlayer = 'X';
let newGame = $('#reset');

function showText() {
  $('.showTurn').text('Its ' + currentPlayer + ' turn');
}



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

    console.log('X won');
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
    console.log('O won');
    return true;

  } else if (board.includes('') === false) {
    $('.win').text("DRAW");
    console.log('DRAW');
    return true;
  }

};

let boxes = $('.box');

let turns = function(index) {
  if (board[index] === '') {
    board[index] = currentPlayer;
    // checkWins();
    if (checkWins() === true) {
      boxes.off('click');
    }
    if (currentPlayer === "X") {
      currentPlayer = "O";
    } else {
      currentPlayer = "X";
    }
  } else {
    console.log("pick another place");
    $('.win').text("pick another place");
  }
  $('.showTurn').text('Its ' + currentPlayer + ' turn');
};
// var gameOver = false;

// let endGame = function() {
//   $('.box').off('click');
// gameOver = true;
// };




boxes.on('click', function(event) {
  if ($(event.target).text() === '') {
    $(event.target).text(currentPlayer);
    console.log(board);
  }
  api.patchGame(store.game.id, event.target.id, currentPlayer, checkWins())
    .then(ui.success)
    .catch(ui.failure);
  turns(event.target.id);

});

const resetGameBoard = function() {
  for (let i = 0; i < board.length; i++) {
    board[i] = '';
    $('.box').text('');
    $('.win').text('');
    currentPlayer = 'X';
    $('.showTurn').text('Turn : ' + currentPlayer);
  }
  boxes.on('click', function(event) {
    if ($(event.target).text() === '') {
      $(event.target).text(currentPlayer);
      turns(event.target.id);
      console.log(board);
    }

  });
};



newGame.on('click', function() {
  resetGameBoard();
});




// var gameOver boolen


module.exports = {
  currentPlayer,
  checkWins,
  board,
  resetGameBoard,
  turns,
  showText
};
