/* exported Ship */

var data;

var Ship = (function(){
  'use strict';
  function Ship(){
    this.height         = 50;
    this.width          = 50;
    this.gravityFlipped = false;
  }

  var alert;
  var flip;
  var currentAngle = 0;

  //preload image(s)
  Ship.prototype.preload = function(game){
    //imageID, imagePath, width, height
    //ship images
    game.load.image('ship', 'assets/images/ship.png', this.width, this.height);

    //ship sounds
    game.load.audio('alert', ['assets/audio/alarm2.mp3', 'assets/audio/alarm2.ogg']);
    game.load.audio('flip', 'assets/audio/flip.ogg');
  };

  //draw the ship on the canvas
  Ship.prototype.create = function(game, x, y){
    //maybe change this later? Seems redundant.
    this.sprite     = game.add.sprite(x, y, 'ship');
    this.alertText  = game.add.text(700, game.world.centerY, 'GRAVITY FLIP', { font: "19px Arial", fill: "red" });
    this.alertText.anchor.setTo(0.5, 0.5); //set x and y in center of the text

 
    //enable physics for the ship
    //physics properties are given to sprite objects, keep this in mind
    game.physics.arcade.enable(this.sprite);

    //ship sounds
    alert = game.add.audio('alert'); 
    alert.volume = 1.2;
    flip = game.add.audio('flip');
    flip.volume = 2; 

    //give the ship no  gravity initially
    this.sprite.body.gravity.y = 0;

  };

  Ship.prototype.update = function(positon){
    if(this.gravityFlipped){
      this.sprite.body.gravity.y = -50;
    }
    if(!this.gravityFlipped){
      this.sprite.body.gravity.y = 50;
    }
  };

  Ship.prototype.movement = function(game) {
    //  only move when you click
    if (game.input.mousePointer.isDown)
    {
      //  400 is the speed it will move towards the mouse
      game.physics.arcade.moveToPointer(this.sprite, 400);

      //  if it's overlapping the mouse, don't move any more
      if (Phaser.Rectangle.contains(this.sprite.body, game.input.x, game.input.y))
      {
        this.sprite.body.velocity.setTo(0, 0);
      }
    }
    else
    {
      this.sprite.body.velocity.setTo(0, this.sprite.body.gravity.y);
    }

  },

  Ship.prototype.gravityFlip = function(){
    //current angle of the ship for flipping direction
    if(currentAngle === -180){
      currentAngle = 0;
    }else{
      currentAngle = -180;
    }

    flip.play();
    this.gravityFlipped = !this.gravityFlipped;
  };

  Ship.prototype.alert = function(){
    //tweening text across screen at 20 seconds for 10 seconds
    game.add.tween(this.alertText)
    .to({x: game.world.centerX}, 400, Phaser.Easing.Linear.None, true, 2000, 0, false)
    .to({x: 700}, 2000, Phaser.Easing.Linear.None, true, 2000, 0, false);

    //alert sound
    alert.play();

    this.gravityFlip();
  };

  return Ship;

})();
