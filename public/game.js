var game;

document.addEventListener("DOMContentLoaded", function() {
  'use strict';
  //MUST use cavnas to perform well on Android
  game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'gameDiv');
  //--GAME STATES
  game.state.add('boot', Boot);
  game.state.add('menu', Menu);
  game.state.add('play', Play);
  game.state.add('score', Score);
  game.state.start('boot');
});

