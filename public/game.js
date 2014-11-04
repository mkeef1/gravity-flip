var game;
var w, h;
console.log(window.innerWidth);
if(window.innerWidth > 2000){
  w = window.innerWidth * window.devicePixelRatio,
  h = window.innerHeight * window.devicePixelRatio;
}else{
  w = window.innerWidth;
  h = window.innerHeight;
}

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

