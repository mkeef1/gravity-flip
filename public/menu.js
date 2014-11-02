
//constructor
function Menu(){}


Menu.prototype = {
  create: function(){
    this.text  = game.add.text(700, game.world.centerY, 'MENU', { font: "30px Arial", fill: "red" });
    this.text.anchor.setTo(0.5, 0.5); //set x and y in center of the text

  },


};