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

Play.prototype = {
    preload: function() { 
        game.stage.backgroundColor = '#71c5cf';

        //maybe migrate this to its own ship.js file
        ship.preload(game);

        game.load.image('pipe', 'assets/pipe.png'); 
        //asteroid to loads.
    },

    create: function() {
    //var line = new Line(this.game);

    // Set entire physics engine for the game
    game.physics.startSystem(Phaser.Physics.ARCADE);

    ship.create(game);

    this.pipes = game.add.group(); // Create a group  
    this.pipes.enableBody = true;  // Add physics to the group  
    this.pipes.createMultiple(20, 'pipe'); // Create 20 pipes

    this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);

    this.score = 0;  
    this.labelScore = game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" });  
    
    },

    update: function() {
        game.physics.arcade.overlap(ship.sprite, this.pipes, this.restartGame, null, this); 
        // This function is called 60 times per second    
        // It contains the game's logic
        if (ship.sprite.inWorld == false){
            this.restartGame(); 
        }
    },

    // Restart the game
    restartGame: function() {  
        // Start the 'main' state, which restarts the game
        game.state.start('play');
    },

    addOnePipe: function(x, y) {  
        // Get the first dead pipe of our group
        var pipe = this.pipes.getFirstDead();

        // Set the new position of the pipe
        pipe.reset(x, y);

        // Add velocity to the pipe to make it move left
        pipe.body.velocity.x = -200; 

        // Kill the pipe when it's no longer visible 
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;

    },

    addRowOfPipes: function() { 

        this.score += 1;  
        this.labelScore.text = this.score; 

        // Pick where the hole will be
        var hole = Math.floor(Math.random() * 5) + 1;

        // Add the 6 pipes 
        for (var i = 0; i < 8; i++)
            if (i != hole && i != hole + 1) 
                this.addOnePipe(400, i * 60 + 10);   
    },
};
