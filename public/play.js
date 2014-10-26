// PLAY STATE
// All game playing material will be placed here.
var Play = function(){
    this.game = game;
}

//What's happening here is the same as this:
/* Play.prototype.preload
   Play.prototype.create

   So on, so forth...
*/
var ship = new Ship();
var debris = new Debris();

Play.prototype = {
    preload: function() { 
        game.stage.backgroundColor = '#000000';
        ship.preload(game);
        debris.preload(game);
        game.load.spritesheet('particle', 'assets/particles/particle.png', 17, 17);

    },

    create: function() {
    //var line = new Line(this.game);

    // Set entire physics engine for the game
    game.physics.startSystem(Phaser.Physics.ARCADE);


    this.spaceParticles();
    ship.create(game, (game.width / 2), 5);
    debris.create(game);

    //Every 1.5seconds, call a function, context in which it will be called
    this.timer = game.time.events.loop(1500, debris.addRowOfDebris, debris);

    this.score = 0;  
    this.labelScore = game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" });  
    
    },

    update: function(){
        game.physics.arcade.overlap(ship.sprite, debris.group, this.restartGame, null, this); 
        ship.movement(this.game);
        // This function is called 60 times per second    
        // It contains the game's logic
        if (ship.sprite.inWorld == false){
            this.restartGame(); 
        }
    },

    // Restart the game
    restartGame: function(){  
        // Start the 'main' state, which restarts the game
        game.state.start('play');
    },

    spaceParticles: function(){
        var emitter = this.game.add.emitter(game.world.centerX, 0, 400);

        emitter.width = this.game.world.width;
        emitter.makeParticles('particle');
    
        emitter.minParticleScale = 0.1;
        emitter.maxParticleScale = 0.5;
    
        emitter.setYSpeed(100, 250);
        emitter.setXSpeed(-2, 2);
    
        emitter.minRotation = 0;
        emitter.maxRotation = 0;
    
        emitter.start(false, 1600, 5, 0);
    },

};
