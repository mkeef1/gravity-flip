/* exported Ship */

var Ship = (function(){
  'use strict';
  function Ship(game){
    this.height         = 30;
    this.width          = 30;
    this.gravityFlipped = false;
  }

  //preload image(s)
  Ship.prototype.preload = function(game){
    //imageID, imagePath, width, height
    game.load.image('ship', 'assets/images/ship.png', this.width, this.height);
  };

  //draw the ship on the canvas
  Ship.prototype.create = function(game){
    //maybe change this later? Seems redundant.
    this.sprite = game.add.sprite(100, 5, 'ship');

    //enable physics for the ship
    //physics properties are given to sprite objects, keep this in mind
    game.physics.arcade.enable(this.sprite);

    //give the ship gravity
    this.sprite.body.gravity.y = 1000;

    //make a variable that golds 
    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this); 
  };

  Ship.prototype.checkbounds = function(){
    this.x = this.x < 0 ? 0 : this.x;
    this.x = this.x > game.canvas.width - 45 ? game.canvas.width - 45 : this.x;

    this.y = this.y < 0 ? 0 : this.y;
    this.y = this.y > game.canvas.height - 45 ? game.canvas.height - 45 : this.y;
    
  };

  //update positon based on accelerometer
  Ship.prototype.update = function(positon){
    this.x += positon.gamma;
    if(this.gravityFlipped){
      this.y += positon.beta;
    }
    if(!this.gravityFlipped){
      this.y = 5;
    }
  };

  Ship.prototype.jump = function() {  
      // Add a vertical velocity to the ship 
      this.sprite.body.velocity.y = -200;
  },

  Ship.prototype.gravityFlip = function(){
    this.gravityFlipped = !this.gravityFlipped;
  };

  return Ship;

})();
