/* exported Ship */

var data;
var alert;
var flip;
var xplode;
var currentAngle = 0;

var Ship = (function(){
  'use strict';
  function Ship(){
    this.height         = 50;
    this.width          = 50;
    this.gravityFlipped = false;
    this.isInvulnerable = false;
  }

  //draw the ship on the canvas
  Ship.prototype.create = function(game, x, y){
    //maybe change this later? Seems redundant.
    this.sprite     = game.add.sprite(x, y, 'ship');
    //draw from center
    this.sprite.anchor.setTo(0.5, 0.5);
    this.alertText  = game.add.text(game.world.width + 100, game.world.centerY, 'GRAVITY FLIP', { font: "30px Arial", fill: "red" });
    this.alertText.anchor.setTo(0.5, 0.5); //set x and y in center of the text
 
    //enable physics for the ship
    //physics properties are given to sprite objects, keep this in mind
    game.physics.arcade.enable(this.sprite);

    //ship sounds
    alert = game.add.audio('alert'); 
    alert.volume = 1.5;
    xplode = game.add.audio('xplode'); 
    xplode.volume = 1.2;
    flip = game.add.audio('flip');
    flip.volume = 2; 

    //give the ship no  gravity initially
    this.sprite.body.gravity.y = 0;

    this.xplodeEmitter = game.add.emitter(0, 0, 300);
    this.xplodeEmitter.makeParticles('particle');

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
    if (game.input.activePointer.isDown)
    {
      //  400 is the speed it will move towards the mouse
      game.physics.arcade.moveToPointer(this.sprite, 400);

      //  if it's overlapping the mouse, don't move any more
      if (Phaser.Rectangle.contains(this.sprite.body, game.input.x, game.input.y))
      {
        this.sprite.body.velocity.setTo(0, this.sprite.body.gravity.y);
      }
    }
    else
    {
      this.sprite.body.velocity.setTo(0, this.sprite.body.gravity.y);
    }

  },

  Ship.prototype.gravityFlip = function(){
    //current angle of the ship for flipping direction
    if(this.sprite.angle === -180){
      this.sprite.angle = 0;
      game.add.tween(this.sprite)
      .to({x: game.world.centerX, y: 5}, 500, Phaser.Easing.Linear.None, true, 500, 0, false)
    }else{
      game.add.tween(this.sprite)
      .to({x: game.world.centerX, y: game.height - 5}, 500, Phaser.Easing.Linear.None, true, 500, 0, false)
      this.sprite.angle = -180;
    }

    this.toggleInvulnerability();
    this.gravityFlipped = !this.gravityFlipped;

  };

  Ship.prototype.explode = function(){
    //show explosion
    this.xplodeEmitter.gravity = 0;
    this.xplodeEmitter.bounce.setTo(0.5, 0.5);
    this.xplodeEmitter.x = this.sprite.position.x;
    this.xplodeEmitter.y = this.sprite.position.y;
    this.xplodeEmitter.explode(3000, 50);

    //play audio
    xplode.play();

    //kill ship
    this.sprite.kill();
  };

  Ship.prototype.alert = function(){
    //tweening text across screen at 20 seconds for 10 seconds

    game.add.tween(this.alertText)
    .to({x: game.world.centerX}, 50, Phaser.Easing.Linear.None, true, 2000, 0, false)
    .to({x: game.world.width + 100}, 2000, Phaser.Easing.Linear.None, true, 2000, 0, false);
    

    //alert sound
    alert.play();

    this.gravityFlip();
  };

  Ship.prototype.toggleInvulnerability = function(){
    //play invuln sound
    flip.play();

    //make the ship blink
    var blink = game.add.tween(this.sprite).to( { alpha: 0 }, 50, Phaser.Easing.Linear.None, true, 0, 100, true);


    this.isInvulnerable = true;
    var turnOffInvulnerability = setTimeout(function(){
      this.isInvulnerable = false;
      clearTimeout(turnOffInvulnerability);
      blink.stop();
      this.sprite.alpha = 1;
    }.bind(this), 5000);
  };

  return Ship;

})();
