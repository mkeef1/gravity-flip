
//constructor
function Menu(){}


Menu.prototype = {
  create: function(){
    this.startButton = game.add.button(game.world.centerX, game.world.centerY + 100, 'startButton', this.startGame, this);
    this.startButton.anchor.setTo(0.5, 0.5);
  },

  startGame: function(){
    game.state.start('play');
  },

};