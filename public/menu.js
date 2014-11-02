
//constructor
function Menu(){}


Menu.prototype = {
  create: function(){
    this.menuBg = game.add.sprite(0, 0, 'menuBg');
    this.menuBg.width = game.width;
    this.menuBg.height = game.height;

    this.startButton = game.add.button(game.world.centerX, game.world.centerY, 'startButton', this.startGame, this);
    this.startButton.anchor.setTo(0.5, 0.5);
    this.startButton.height = 50;
    this.startButton.width  = 150;

    this.spaceParticles();
  },

  startGame: function(){
    game.state.start('play');
  },

  spaceParticles: function(){
    var emitter = game.add.emitter(game.world.centerX, 0, 400);

    emitter.width = game.world.width;
    emitter.makeParticles('particle');

    emitter.minParticleScale = 0.1;
    emitter.maxParticleScale = 0.5;

    emitter.setYSpeed(200, 500);
    emitter.setXSpeed(-2, 2);

    emitter.minRotation = 0;
    emitter.maxRotation = 0;

    emitter.start(false, 1600, 200, 0);
  },

};