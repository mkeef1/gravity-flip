/* exported Game */
/* global Ship, Line */

var Game = (function(){
  'use strict';

  var animate = '',
  gameClock = '';

  //game objects
  function Game(){
      var bodyHeight   = window.innerHeight,
          headerHeight = document.getElementsByTagName('ion-header-bar')[0].clientHeight;

    this.canvas        = document.getElementById('canvas');
    this.ctx           = this.canvas.getContext('2d');
    this.canvas.width  = window.innerWidth;
    this.canvas.height = bodyHeight - headerHeight;
    this.assets        = Asset.load();
    this.hasCrashed    = false; //has the ship crashed yet?
    this.clock         = 0;
    this.flipTimer     = 0;
    this.lines         = [];
    this.currentLine   = 0;
    this.isWarning     = false;
    this.listen(); //listen for device orientation change
  }

  Game.prototype.listen = function(){
    window.addEventListener('deviceorientation', function(data){
      if(this.ship){
        this.ship.update(data);
      }
    }.bind(this));
  };

  Game.prototype.loop = function(){
    this.clear(); //clear canvas


    //draw lines that are currently in lines array
    this.lines.forEach(function(line, index){
      line.draw(this, index);
      line.update(this, index);

    }.bind(this));

    this.gravityFlip();

    //draw the ship
    this.ship.draw(this);

    //check ship collision
    window.addEventListener('shipcrash', function(){
      this.hasCrashed = true;
    }.bind(this));

    //animation
    //animate = window.requestAnimationFrame(this.loop.bind(this));

    if(this.hasCrashed){
      this.assets.audioActiveGame.pause();
      //window.cancelAnimationFrame(animate);
      clearInterval(animate);
      clearInterval(gameClock);
      this.clear();
    }

  };

  Game.prototype.clear = function(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  Game.prototype.timer = function(){
    this.clock++;
    window.dispatchEvent(new CustomEvent('timer', {'detail':this.clock}));
    this.flipTimer++;
    if(this.clock % 4 === 0){
      var newLine = new Line(this);
      this.lines.push(newLine);
    }

    if(this.lines.length > 5){
      this.lines.shift();
    }

    if(this.clock % 48 === 0){
      this.assets.audioActiveGame.play();
    }
  };

  Game.prototype.gravityFlip = function(){
    if(this.flipTimer > 20){
        //this.assets.audioWarn.play();
        //red backdrop
        this.ctx.fillStyle = 'rgba(255, 0, 0, 0.6)';
        this.ctx.fillRect(0, (this.canvas.height / 2.3), this.canvas.width, 150);
      if(this.flipTimer % 2 === 0){
        //draw warning
        this.ctx.fillStyle = 'black';
        this.ctx.font = '16pt Bell';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('GRAVITY FLIP IMMINENT', (this.canvas.width / 2), (this.canvas.height / 2));
      }
    }
    if(this.flipTimer === 30){
      //this.assets.audioWarn.pause();
      this.ship.gravityFlip();
      this.flipTimer = 0;
    }
  };

  Game.prototype.start = function(){
    //timer for adding new lines
    gameClock = setInterval(this.timer.bind(this), 1000);
    this.hasCrashed = false;
    this.ship = new Ship(this);
    this.lines.push(new Line(this));
    this.assets.audioActiveGame.play();
    //this.loop();
    //FOR OLDER ANDROID ONLY
    animate = setInterval(this.loop.bind(this), 16);
  };


  return Game;

})();
