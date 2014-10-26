/* exported Asset */
/* global Media */

var Asset = (function(){
  'use strict';

  function Asset(){
  }

  Asset.load = function(){
    var asset = {};

    asset.ship = new Image();
    asset.ship.src = 'img/assets/ship.png';
    asset.asteroid1 = new Image();
    asset.asteroid1.src = 'img/assets/asteroid1.jpg';
    asset.asteroid2 = new Image();
    asset.asteroid2.src = 'img/assets/asteroid2.jpg';
    asset.asteroid3 = new Image();
    asset.asteroid3.src = 'img/assets/asteroid3.jpg';
    asset.asteroid4 = new Image();
    asset.asteroid4.src = 'img/assets/asteroid4.jpg';
    asset.asteroid5 = new Image();
    asset.asteroid5.src = 'img/assets/asteroid5.jpg';
    asset.asteroid6 = new Image();
    asset.asteroid5.src = 'img/assets/asteroid6.jpg';
    asset.jupiter = new Image();
    asset.jupiter.src = 'img/assets/jupiter.jpg';
    asset.mars = new Image();
    asset.mars.src = 'img/assets/mars.jpg';
    asset.venus = new Image();
    asset.venus.src = 'img/assets/venus.jpg';
    asset.neptune = new Image();
    asset.neptune.src = 'img/assets/neptune.jpg';
    asset.earth = new Image();
    asset.earth.src = 'img/assets/earth.jpg';
    asset.pluto = new Image();
    asset.pluto.src = 'img/assets/pluto.png';
    asset.saturn = new Image();
    asset.saturn.src = 'img/assets/saturn.jpg';
    asset.uranus = new Image();
    asset.uranus.src = 'img/assets/uranus.jpg';
    asset.theSun = new Image();
    asset.theSun.src = 'img/assets/sun.jpg';

    /*
    //IOS
    asset.audioWarn = new Media();
    asset.audioWarn.src = 'audio/alarm2.mp3';
    asset.audioActiveGame = new Media();
    asset.audioActiveGame.src = 'audio/main.mp3';
    */


    //audio
    //ANDROID
    asset.audioWarn = new Audio('audio/alarm2.mp3');
    asset.audioActiveGame = new Audio('audio/main.mp3');

    return asset;
  };


  return Asset;
})();
