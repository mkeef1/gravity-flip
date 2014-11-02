
function Score(){}


Score.prototype = {
  create: function(){
    this.text = game.add.text(game.world.centerX, game.world.centerY + 100, 'Final Score: ' + player.score, {font: "30px Arial", fill: "red"});
    this.text.anchor.setTo(0.5, 0.5);
 
  }
}