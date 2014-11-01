var game;

document.addEventListener("DOMContentLoaded", function() {
  'use strict';
  //width, height, type of medium to use, what element to attach canvas to, function that will be used
  game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'gameDiv');
  //--GAME STATES
  //Game states are added to the Game Object. When a game
  //is made, State().start will be the default starting state
  game.state.add('play', Play);  
  game.state.start('play');
});

