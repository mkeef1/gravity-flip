var game;
var w, h;
w = window.innerWidth;
h = window.innerHeight;


document.addEventListener("DOMContentLoaded", function() {
  'use strict';
  //MUST use cavnas to perform well on Android
  game = new Phaser.Game(w, h, Phaser.CANVAS, 'gameDiv');
  //--GAME STATES
  game.state.add('boot', Boot);
  game.state.add('menu', Menu);
  game.state.add('play', Play);
  game.state.add('score', Score);
  game.state.start('boot');
});

