'use strict';
//
// const success = (data) => {
//   if (data) { console.log(data); }
// };
//
// const failure = (error) => {
//   console.error(error);
// };

const signUpSuccess =() =>{
  $('#sign-up1').dropdown('toggle');
  $('#sign-up').val('');

};
const signInSuccess = () => {
  // $('#sign-in1').dropdown('toggle');

  // $('#sign-up').val('');
  $('#sign-in').val('');
  $('#sign-up-btb').hide();
  $('.signinhide').hide();
  $('#getGame').show();
  // $('#change-password').show();
  $('#sign-out').show();
  $('#reset').show();
  // $('.win').show();
  $('.changebtn').show();

};
const signOutSuccess = () => {
  $('#sign-out').hide();
  // $('#change-password').hide();
  $('#getGame').hide();
  $('#reset').hide();
  $('#wrapper').hide();
  $('.history').hide().val('');
  $('#sign-in').show();
  $('#sign-up').show();
  $('.showTurn').hide();
  $('#logs').hide();
  $('.signinhide').show();
  $('#sign-up-btb').show();
  $('.changebtn').hide();


};
const createGameSuccess = () => {
  $('#wrapper').show();
  $('.history').hide();
  $('.win').show();
};
const getGameSuccess = (data) => {
  $('.history').show();
  $('.history').text('You\'ve played ' + data.games.length + ' times!');

};

module.exports = {
  signInSuccess,
  signOutSuccess,
  createGameSuccess,
  getGameSuccess,
  // success,
  // failure,
  signUpSuccess
};
