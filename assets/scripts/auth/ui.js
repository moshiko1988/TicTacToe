'use strict';
//
const success = (data) => {
  if (data) { console.log(data); }
};

const failure = (error) => {
  console.error(error);
};
//
// module.exports = {
//   failure,
//   success,
// };


const signInSuccess = () => {
  $('#sign-up').val('');
  $('#sign-in').val('');
  // $('#sign-up-btn').hide();
  $('#sign-in').hide();
  $('#getGame').show();
  // $('#change-password').show();
  $('#sign-out').show();
  $('#reset').show();
  $('.win').show();

};
const signOutSuccess = () => {
  $('#sign-out').hide();
  // $('#change-password').hide();
  $('#getGame').hide();
  $('#reset').hide();
  $('#dude').hide();
  $('.history').hide().val('');
  $('#sign-in').show();
  // $('#sign-up').show();
  $('.showTurn').hide();
  $('.win').hide();

};
const createGameSuccess = () => {
  $('#dude').show();
  $('.history').hide();

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
  success,
  failure
};
