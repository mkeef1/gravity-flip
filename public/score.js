
function Score(){}


Score.prototype = {
  create: function(){
    this.gameOver = game.add.text(game.world.centerX, game.world.centerY - 100, 'Game Over', {font: "30px Arial", fill: "red"});
    this.gameOver.anchor.setTo(0.5, 0.5);

    this.text = game.add.text(game.world.centerX, game.world.centerY + 100, 'Final Score: ' + player.score, {font: "30px Arial", fill: "red"});
    this.text.anchor.setTo(0.5, 0.5);

    //play again?
    this.startButton = game.add.button(game.world.centerX, game.world.centerY + 200, 'startButton', this.startGame, this);
    this.startButton.anchor.setTo(0.5, 0.5);
    this.startButton.width = 100;
    this.startButton.height = 100;
  },

  startGame: function(){
    game.state.start('play');
  }
}