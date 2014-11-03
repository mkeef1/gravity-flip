/* exported Debris */
var currentDirection;

var Debris = (function(){
  'use strict';

  function Debris(game){
    this.debrisImgIndex = Math.floor((Math.random() * 9));
    this.velocity = -180;
  }

  Debris.prototype.create = function(game){
    this.group = game.add.group(); // Create a group  
    this.group.enableBody = true;  // Add physics to the group

    currentDirection = game.world.height;

    //alert
    this.difficultyAlert = game.add.text(700, game.world.centerY + 120, 'SPEED INCREASED', { font: "30px Arial", fill: "red" });
    this.difficultyAlert.anchor.setTo(0.5, 0.5); //set x and y in center of the text


    //create 20 random images for the debris lines
    for(var i = 0; i < 35; i++){
      //params: x, y, imageID, frame, exists(t or f)
      this.group.create(0, 0, randomImage(), 0, false);
    }
  };

  Debris.prototype.addOneDebris = function(x, y) {  
      // Get the first dead pipe of our group
      var debris = this.group.getFirstDead();

      if(!debris.width){
        return;
      }

      //manually set size of the debris
      debris.width = 45;
      debris.height = 45;


      //change the hitboxes for each piece of debris
      debris.body.width = 45;
      debris.body.height = 45;

      // Set the new position of the debris piece
      debris.reset(x, y);
      console.log(y);

      // Add velocity to the pipe to make it move left
      debris.body.velocity.y = this.velocity; 

      // Kill the pipe when it's no longer visible 
      debris.checkWorldBounds = true;
      debris.outOfBoundsKill = true;

  };


  Debris.prototype.addRowOfDebris = function(){ 
    // Pick where the hole will be
    var hole = Math.floor(Math.random() * 6) + 1;

    // Add the 6 pipes 
    for (var i = 0; i < 9; i++){
      if (i != hole && i != hole + 1){
        this.addOneDebris(i * 60 + 10, currentDirection); 
      }    
    }
  };

  Debris.prototype.changeDirection = function(){
    this.velocity = this.velocity * -1;
    var newVelocity = this.velocity;
    this.group.forEach(function(debris){
      if(currentDirection === game.world.height){
        debris.body.velocity.y = Math.abs(newVelocity);
      }else{
        debris.body.velocity.y = newVelocity;
      }
    }, this.group);

    //decided to let this if block check only once, didn't put in forEach above on purpose
    if(currentDirection === game.world.height){
      currentDirection = 0;
    }else{
      currentDirection = game.world.height;
    }

  },

  Debris.prototype.increaseDifficulty = function(){
    if(this.velocity < 0){
      this.velocity -= 80;
    }else{
      this.velocity += 80;
    }
    game.add.tween(this.difficultyAlert)
    .to({x: game.world.centerX}, 400, Phaser.Easing.Linear.None, true, 2000, 0, false)
    .to({x: 700}, 2000, Phaser.Easing.Linear.None, true, 2000, 0, false);
  }

  function randomImage(){
    var images = ['debris1', 'debris2', 'debris3', 'debris4', 'debris5', 'debris6']
    return images[Math.floor((Math.random() * 6))];
  }



  return Debris;

})();
