
function Score(){}


Score.prototype = {
  create: function(){
    this.scoreBg = game.add.sprite(0, 0, 'scoreBg');
    this.scoreBg.width = game.width;
    this.scoreBg.height = game.height;

    this.text = game.add.text(game.world.centerX, game.world.centerY, 'Final Score: ' + player.score, {font: "30px Arial", fill: "rgba(211, 211, 211, 0.8)"});
    this.text.anchor.setTo(0.5, 0.5);

    //play again?
    this.startButton = game.add.button(game.world.centerX, game.world.centerY + 100, 'playAgainButton', this.startGame, this);
    this.startButton.anchor.setTo(0.5, 0.5);
    this.startButton.width = 150;
    this.startButton.height = 50;

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
  }
}