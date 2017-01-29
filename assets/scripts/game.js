'use strict';
const api = require('./auth/api');
const ui = require('./auth/ui');
const store = require('./store');

const board = ['', '', '', '', '', '', '', '', ''];

let currentPlayer = 'X';
// let newGame = $('#reset');

// function showText(){
//   $('.showTurn').text('Its ' + currentPlayer + ' turn');
// }

const blinkMe = function() {
  (function blink() {
        $('.win').fadeOut(500).fadeIn(500, blink);
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
    // (function blink() {
    //   $('.win').fadeOut(500).fadeIn(500, blink);
    // })();
    blinkMe();
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
    blinkMe();
    console.log('O won');
    return true;

  } else if (board.includes('') === false) {
    $('.win').text("DRAW");
    blinkMe();
    console.log('DRAW');
    return true;
  } return false;

};

let boxes = $('.box');

let turns = function() {
    // checkWins();
    if (checkWins() === true) {
      boxes.off('click');
    }
    if (currentPlayer === "X") {
      currentPlayer = "O";
    } else {
      currentPlayer = "X";
    }
    //  $('.showTurn').text('Its ' + currentPlayer + ' turn');
};



// boxes.on('click', function(event) {
//   if ($(event.target).text() === '') {
//     $(event.target).text(currentPlayer);
//     board[parseInt(event.target.id)] = currentPlayer;
//     console.log(board);
//   }else {
//     console.log("pick another place");
//     $('.win').text("pick another place");
//   }
//
//   api.patchGame(store.game.id, event.target.id, currentPlayer, checkWins())
//   .then(ui.success)
//   .catch(ui.failure);
//   turns();
//
//
// });

const resetGameBoard = function() {
  for (let i = 0; i < board.length; i++) {
    board[i] = '';
    $('.box').text('');
    $('.win').text('');
    currentPlayer = 'X';
    // $('.showTurn').text('Turn : ' + currentPlayer);
  }
  boxes.on('click', function(event) {
    if ($(event.target).text() === '') {
      $(event.target).text(currentPlayer);
      board[(event.target.id)] = currentPlayer;
      console.log(board);
      api.patchGame(store.game.id, event.target.id, currentPlayer, checkWins())
      .then(ui.success)
      .catch(ui.failure);
      turns();
    }else {
      console.log("pick another place");
      $('.win').text("pick another place");
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
      .catch(ui.failure)
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
