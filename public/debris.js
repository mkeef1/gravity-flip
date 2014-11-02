/* exported Debris */
var Debris = (function(){
  'use strict';

  function Debris(game){
    this.debrisImgIndex = Math.floor((Math.random() * 9));
    this.velocity = -180;
  }

  Debris.prototype.create = function(game){
    this.group = game.add.group(); // Create a group  
    this.group.enableBody = true;  // Add physics to the group


    //alert
    this.difficultyAlert = game.add.text(700, game.world.centerY + 120, 'SPEED INCREASED', { font: "30px Arial", fill: "red" });
    this.difficultyAlert.anchor.setTo(0.5, 0.5); //set x and y in center of the text


    //create 20 random images for the debris lines
    for(var i = 0; i < 40; i++){
      //params: x, y, imageID, frame, exists(t or f)
      this.group.create(0, 0, randomImage(), 0, false);
    }
  };

  Debris.prototype.addOneDebris = function(x, y) {  
      // Get the first dead pipe of our group
      var debris = this.group.getFirstDead();

      //manually set size of the debris
      debris.width = 45;
      debris.height = 45;


      //change the hitboxes for each piece of debris
      debris.body.width = 45;
      debris.body.height = 45;

      // Set the new position of the debris piece
      debris.reset(x, y);

      // Add velocity to the pipe to make it move left
      debris.body.velocity.y = this.velocity; 

      // Kill the pipe when it's no longer visible 
      debris.checkWorldBounds = true;
      debris.outOfBoundsKill = true;

  };


  Debris.prototype.addRowOfDebris = function() { 
    // Pick where the hole will be
    var hole = Math.floor(Math.random() * 5) + 1;

    // Add the 6 pipes 
    for (var i = 0; i < 9; i++){
        if (i != hole && i != hole + 1){
          this.addOneDebris(i * 60 + 10, 900); 
        }    
    }
  };

  Debris.prototype.increaseDifficulty = function(){
    this.velocity -= 40;
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
