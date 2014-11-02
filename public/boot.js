//PRELOADER
function Boot(){}

Boot.prototype = {
  preload: function(){
    //Images
    game.load.image('ship', 'assets/images/ship.png', this.width, this.height);
    game.load.image('debris1', 'assets/images/asteroid1.jpg');
    game.load.image('debris2', 'assets/images/asteroid2.jpg');
    game.load.image('debris3', 'assets/images/asteroid3.jpg');
    game.load.image('debris4', 'assets/images/asteroid4.jpg');
    game.load.image('debris5', 'assets/images/asteroid5.jpg');
    game.load.image('debris6', 'assets/images/asteroid6.jpg');
    game.load.image('startButton', 'assets/images/startButton.png');

    //Audio & FX
    game.load.audio('alert', ['assets/audio/alarm2.mp3', 'assets/audio/alarm2.ogg']);
    game.load.audio('flip', 'assets/audio/flip.ogg');
    game.load.audio('bgmusic', ['assets/audio/main.mp3', 'assets/audio/main.ogg']);
  
    //Spritesheets
    game.load.spritesheet('particle', 'assets/particles/particle.png', 17, 17);
  },

  create: function(){
    game.state.start('menu');
  }
};

