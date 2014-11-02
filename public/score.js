
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
  },

  startGame: function(){
    game.state.start('play');
  }
}