// Linted with standardJS - https://standardjs.com/

// Initialize the Phaser Game object and set default game window size
// phaser version 2.0.7
function fix_errors_and_computers(){


const game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update
})

// Declare shared variables at the top so all methods can access them
let score = 0;
let scoreText;
let platforms
let diamonds
let cursors
let player
let bullets;
let bulletTime = 0;
let fireButton;
let diamonds_count=0;
var enemies;
var winText;
var stateText;
var gameOverText;
var explosions;

function preload () {
  // navbar();
  // Load & Define our game assets
  game.load.image('sky', './img/game/sky.png')
  game.load.image('ground', './img/game/platform.png')
  game.load.image('diamond', './img/game/diamond.png')
  game.load.image('computer', './img/game/computer.png')
  game.load.spritesheet('woof', './img/game/woof.png', 32, 32)
  game.load.spritesheet('tom', './img/game/tom2.png', 48, 62);
  game.load.spritesheet('kaboom', './img/game/explode.png', 128, 128);
  game.load.image('bullet', "./img/game/bullet2.png")
  game.load.image('enemy',"./img/game/error.png");
}

function create () {
  //  We're going to be using physics, so enable the Arcade Physics system
  game.physics.startSystem(Phaser.Physics.ARCADE)
  //  A simple background for our game
  game.add.sprite(0, 0, 'sky')
  //  The platforms group contains the ground and the 2 ledges we can jump on
  platforms = game.add.group()
  //  We will enable physics for any object that is created in this group
  platforms.enableBody = true
  // Here we create the ground.
  const ground = platforms.create(0, game.world.height - 64, 'ground')
  //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
  ground.scale.setTo(2, 2)
  //  This stops it from falling away when you jump on it
  ground.body.immovable = true
  //  Now let's create two ledges
  let ledge = platforms.create(400, 450, 'ground')
  ledge.body.immovable = true
  ledge = platforms.create(-75, 350, 'ground')
  ledge.body.immovable = true

  // The player and its settings
  player = game.add.sprite(32, game.world.height-150, 'tom')
  player.anchor.setTo(0.5,0.5) // for player.revive();
  //  We need to enable physics on the player
  game.physics.arcade.enable(player)
  // game.physics.enable(player, Phaser.Physics.ARCADE);

  //  Player physics properties. Give the little guy a slight bounce.
  player.body.bounce.y = 0.2
  player.body.gravity.y = 800
  player.body.collideWorldBounds = true

  //  Our two animations, walking left and right.
  player.animations.add('left', [0, 1], 10, true)
  player.animations.add('right', [2, 3], 10, true)

  //  Finally some diamonds to collect
  diamonds = game.add.group()

  //  Enable physics for any object that is created in this group
  diamonds.enableBody = true

  //  Create 12 diamonds evenly spaced apart
 createDiamonds();

  //  Create the score text
  scoreText = game.add.text(16, 16, '', { fontSize: '32px', fill: '#000' });

  //  And bootstrap our controls
  cursors = game.input.keyboard.createCursorKeys();
  bullets = game.add.group();
  bullets.enableBody = true;
  bullets.physicsBodyType = Phaser.Physics.ARCADE;
  bullets.createMultiple(30, 'bullet');
  bullets.setAll('anchor.x', 0.5);
  bullets.setAll('anchor.y', 1);
  bullets.setAll('outOfBoundsKill', true);
  bullets.setAll('checkWorldBounds', true);
  fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  enemies = game.add.group();
  enemies.enableBody = true;
  enemies.physicsBodyType = Phaser.Physics.ARCADE;

  createEnemies();
  winText = game.add.text(game.world.centerX,game.world.centerY, "You Win!",{font: '32px Arial', fill:"#000"});
  winText.visible = false;
  gameOverText = game.add.text(game.world.centerX,game.world.centerY, "You Lose!",{font: '32px Arial', fill:"#000"});
  gameOverText.visible = false;

  explosions = game.add.group();
  explosions.createMultiple(30,'kaboom');
  explosions.forEach(setupInvader, this);
}

function update () {

  game.physics.arcade.overlap(bullets,enemies,collisionHandler,null,this); // this is what happens when the bullet hits the enemies
  game.physics.arcade.overlap(player,enemies,collisionHandlerPlayer,null,this); 
  if(fireButton.isDown){
    fireBullet();
  }
  //  We want the player to stop when not moving
  player.body.velocity.x = 0
  

  //  Setup collisions for the player, diamonds, and our platforms
  game.physics.arcade.collide(player, platforms)
  game.physics.arcade.collide(diamonds, platforms)

  //  Call callectionDiamond() if player overlaps with a diamond
  game.physics.arcade.overlap(player, diamonds, collectDiamond, null, this)

  // Configure the controls!
  if (cursors.left.isDown) {
    player.body.velocity.x = -150
    player.animations.play('left')
  } else if (cursors.right.isDown) {
    player.body.velocity.x = 150
    player.animations.play('right')
  } else {
    // If no movement keys are pressed, stop the player
    player.animations.stop()
  }

  //  This allows the player to jump!
  if (cursors.up.isDown && player.body.touching.down) {
    player.body.velocity.y = -400
  }
  // Show an alert modal when score reaches 120


}

function collectDiamond (player, diamond) {
  // Removes the diamond from the screen
  diamond.kill()

  //  And update the score
  diamonds_count +=1;
  score += 10;
  // if (diamonds_count === 12) {
  //   alert('You win!')
  // }
  scoreText.text = 'Score: ' + score;
  if( diamonds_count == 12){
    winText.text = " WINNER!! \n Click to restart";
    winText.visible = true;
    game.input.onTap.addOnce(restart,this);
  }

}

function fireBullet(){
  if(game.time.now > bulletTime){
    bullet = bullets.getFirstExists(false);
    if(bullet){
      bullet.reset(player.x,player.y);
      bullet.body.velocity.y = -400;
      bulletTime = game.time.now + 200;
    }
  }
}
function setupInvader (enemy) {

  enemy.anchor.x = 0.5;
  enemy.anchor.y = 0.5;
  enemy.animations.add('kaboom');

}
function createDiamonds(){
  for (var i = 0; i < 12; i++) {
    const diamond = diamonds.create(i * 70, 0, 'computer')

    //  Drop em from the sky and bounce a bit
    diamond.body.gravity.y = 1000
    diamond.body.bounce.y = 0.3 + Math.random() * 0.2
  }
}
function createEnemies(){
  for(var y = 0; y<4; y++){
    for(var x = 0; x<10; x++){
      var enemy = enemies.create(x*48,y*50,'enemy');
      enemy.anchor.setTo(0.5,0.5); //place the enemy
      enemy.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
      enemy.play('fly');
      enemy.body.moves = false;
    }
  }
  enemies.x = 100; // putting it in the middle
  enemies.y = 50;

  var tween = game.add.tween(enemies).to({x:200},2000,Phaser.Easing.Linear.None,true,0,1000,true);
  tween.onLoop.add(descend,this);
}

function descend(){
  enemies.y += 10;
}

function collisionHandler(bullet,enemy){
  bullet.kill();
  enemy.kill();
  score += 10
  scoreText.text = 'Score: ' + score
  var explosion = explosions.getFirstExists(false);
  explosion.reset(enemy.body.x, enemy.body.y);
  explosion.play('kaboom',30,false,true);
}

function collisionHandlerPlayer(player,enemy){
  player.kill();
  enemy.kill();
  // gameOverText.visible = true;


  // alert('You Lose!')
  winText.text = "Try again, \n Click to restart";
  winText.visible = true;
  game.input.onTap.addOnce(restart,this);
  
}

function resetBullet(bullet){
  bullet.kill();
}

function restart () {

  //  A new level starts
  

  //  And brings the aliens back from the dead :)
  enemies.removeAll();
  createEnemies();
  diamonds.removeAll();
  createDiamonds();
  score = 0;
  scoreText.text = 'Score: ' + score
  diamonds_count = 0;

  //revives the player
  player.reset(32, game.world.height-150);
  // player.revive();
  //hides the text
  winText.visible = false;

}

}