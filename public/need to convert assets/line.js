/* exported Line */
/* global Rock */

var Line = (function(){
  'use strict';

  function Line(game){
    this.x = 0;
    this.y = game.canvas.height;
    this.debris = [];

    this.create(game);
  }

  Line.prototype.draw = function(game, index){
    game.lines[index].debris.forEach(function(rock){
      rock.draw(game);
    });
  };

  Line.prototype.create = function(game){
    var currentX = 0,
    debrisToDraw = Math.floor((Math.random() * 5) + 1), //number of objects
    debrisPos = ['hole', 'hole', 'hole', 'hole', 'hole', 'hole'],
    nums = [],
    maxNum = 6,
    num;

    while (nums.length < debrisToDraw) {
      num = Math.floor(Math.random() * maxNum);
      if (nums.indexOf(num) === -1) {
        nums.push(num);
      }
    }

    for(var i= 0; i < nums.length; i++){
        debrisPos[nums[i]]='rock';
      }

    for(var j= 0; j < debrisPos.length; j++){
      if(debrisPos[j] !== 'rock'){
          currentX += window.innerWidth/6;
        }else{
          this.debris.push(new Rock({y: game.canvas.height, x: currentX}));
          currentX += window.innerWidth/6;
        }
      }
  };

  Line.prototype.update = function(game){
    //asteroids speed
    this.y -= 2;

    this.debris.forEach(function(rock){
      rock.update(this, game);
    }.bind(this));
    //here goes a function to check position of game.ship against position of each rock in this line
    //put htis inside
  };

  return Line;
})();
