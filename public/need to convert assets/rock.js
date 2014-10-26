/* exported Rock */
var Rock = (function(){
  'use strict';

  function Rock(line){
    this.width        = window.innerWidth/6;
    this.height       = window.innerWidth/6;
    this.x            = line.x;
    this.y            = line.y;
    this.rockImgIndex = Math.floor((Math.random() * 9));
    this.isCollided   = false;
    this.r            = this.width / 2;
  }

  Rock.prototype.draw = function(game){
    var rockImgs     = [game.assets.earth, game.assets.uranus, game.assets.neptune, game.assets.theSun, game.assets.saturn, game.assets.pluto, game.assets.asteroid1, game.assets.asteroid2, game.assets.asteroid3, game.assets.asteroid4, game.assets.asteroid5, game.assets.asteroid6, game.assets.venus, game.assets.jupiter, game.assets.mars, game.assets.neptune];
    //game.ctx.fillStyle = 'white';
    //game.ctx.fillRect(this.x, this.y, this.width - 20, this.height - 20);
    game.ctx.drawImage(rockImgs[this.rockImgIndex], this.x, this.y, this.width - 23, this.height - 23);
  };

  Rock.prototype.update = function(line, game){
    this.y = line.y;
    this.checkCollision(game.ship);
  };

  Rock.prototype.checkCollision = function(ship){
    //var sumsquares = Math.pow((this.x + this.r) - ship.x, 2) + Math.pow(this.y - ship.y, 2),
    var sumsquares = Math.pow(this.x  - ship.x, 2) + Math.pow(this.y - ship.y, 2),
        distance = Math.sqrt(sumsquares);
    //needs to be fixed in relation to how rocks are being drawn
    if(distance < (this.r  * 0.7)){
      window.dispatchEvent(new Event('shipcrash'));
    }
  };

  return Rock;

})();
