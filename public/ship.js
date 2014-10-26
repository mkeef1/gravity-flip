/* exported Ship */

var Ship = (function(){
  'use strict';
  function Ship(){
    this.height         = 50;
    this.width          = 50;
    this.gravityFlipped = false;
  }

  //preload image(s)
  Ship.prototype.preload = function(game){
    //imageID, imagePath, width, height
    game.load.image('ship', 'assets/images/ship.png', this.width, this.height);
  };

  //draw the ship on the canvas
  Ship.prototype.create = function(game, x, y){
    //maybe change this later? Seems redundant.
    this.sprite = game.add.sprite(game.world.centerX, y, 'ship');

    //enable physics for the ship
    //physics properties are given to sprite objects, keep this in mind
    game.physics.arcade.enable(this.sprite);

    //give the ship no  gravity initially
    this.sprite.body.gravity.y = 0;

  };

  Ship.prototype.update = function(positon){
    if(this.gravityFlipped){
      this.sprite.body.gravity.y = -20;
    }
    if(!this.gravityFlipped){
      this.sprite.body.gravity.y = 0;
    }
  };

  Ship.prototype.movement = function(game) {  
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
        this.sprite.x -= 6;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
        this.sprite.x += 6;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)){
        this.sprite.body.velocity.y -= 10;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
        this.sprite.body.velocity.y += 10;
    }
  },

  Ship.prototype.gravityFlip = function(){
    this.gravityFlipped = !this.gravityFlipped;
  };

  return Ship;

})();
