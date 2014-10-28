// PLAY STATE
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
var bgmusic;

Play.prototype = {
    preload: function(){ 
        game.stage.backgroundColor = '#000000';
        ship.preload(game);
        debris.preload(game);
        game.load.spritesheet('particle', 'assets/particles/particle.png', 17, 17);
        game.load.audio('bgmusic', ['assets/audio/main.mp3', 'assets/audio/main.ogg']);
    },

    create: function() {
    // Set entire physics engine for the game
    game.physics.startSystem(Phaser.Physics.ARCADE);

    /* IMAGES CREATION */
    this.spaceParticles();
    debris.create(game);
    ship.create(game, game.world.centerX, 5);

    /* SOUND/MUSIC CREATIONS */
    bgmusic = game.add.audio('bgmusic');
    bgmusic.loop = true;
    bgmusic.volume = 0.5;
    bgmusic.play();

    /* SCORE SYSTEM */
    //params: every 1.5seconds, call a function, context in which it will be called
    this.timer = game.time.events.loop(1500, debris.addRowOfDebris, debris);
    this.scoreTimer = game.time.events.loop(1700, this.addToScore, this);
    this.difficultyTimer = game.time.events.loop(50000, debris.increaseDifficulty, debris);
    this.score = 0;

    /* PLAY OBJECT TIMERS */
    //gravity flip timer
    this.flipTimer = game.time.events.loop(30000, ship.alert, ship);

    //score label
    this.labelScore = game.add.text(20, 20, this.score.toString(), { font: "15px Arial", fill: "#ffffff" });
    
    },

    update: function(){
        //collision checking for the ship vs debris
        game.physics.arcade.overlap(ship.sprite, debris.group, this.restartGame, null, this); 

        //ship logic
        ship.movement(this.game);
        ship.update();

        //in world collision detection
        if (ship.sprite.inWorld == false){
            this.restartGame(); 
        }
    },

    restartGame: function(){
        bgmusic.stop();
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
    
        emitter.start(false, 1600, 200, 0);
    },

    addToScore: function(){
        this.score += 20;
        this.labelScore.text = this.score;
    }

};
