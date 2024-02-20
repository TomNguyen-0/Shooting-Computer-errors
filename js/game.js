// define variables
var game;
var player;
var platforms;
var badges;
var items;
var cursors;
var jumpButton;   // up arrow key
var jumpButton2;  // space bar
var text;
var winningMessage;
var won = false;
var currentScore = 0;
var winningScore = 100;
var show_award_flag = false;
var poison_count = 0; // getting two poison means lose


// add collectable items to the game
function addItems() {
  items = game.add.physicsGroup();
  createItem(375, 400, 'badge1');
  createItem(575, 500, 'badge2');
  createItem(225, 500, 'badge3');
  createItem(100, 250, 'badge4');
  createItem(575, 150, 'badge5');
  createItem(525, 300, 'badge8');
  createItem(650, 250, 'badge');
  createItem(225, 200, 'coin');
  createItem(375, 100, 'poison');
  createItem(305, 85, 'hackday');
  createItem(370,500,'poison');
  createItem(100, 375, 'poison');
  createItem(125, 50, 'star');
}

// add platforms to the game
function addPlatforms() {
  platforms = game.add.physicsGroup();
  platforms.create(450, 550, 'platform');
  platforms.create(100, 550, 'platform');
  platforms.create(300, 450, 'platform');
  platforms.create(250, 150, 'platform');
  platforms.create(50, 300, 'platform');
  platforms.create(150, 250, 'platform');
  platforms.create(650, 300, 'platform');
  platforms.create(550, 200, 'platform2');
  platforms.create(300, 450, 'platform2');
  platforms.create(400, 350, 'platform2');
  platforms.create(100, 100, 'platform2');
  platforms.setAll('body.immovable', true);
}

// create a single animated item and add to screen
function createItem(left, top, image) {
  var item = items.create(left, top, image);
  item.animations.add('spin');
  item.animations.play('spin', 10, true);
}

// create the winning badge and add to screen
function createBadge() {
  badges = game.add.physicsGroup();
  var badge = badges.create(750, 400, 'award2');
  badge.animations.add('spin');
  badge.animations.play('spin', 10, true);
}

// when the player collects an item on the screen
function itemHandler(player, item) {
  item.kill();
  var points_10 = ['badge','badge1','badge2','badge3','badge5','badge8']
  var points_15 = ['coin','badge4','hackday']
  if (points_15.includes(item.key)){
    currentScore = currentScore + 15;
  }
  if ( points_10.includes(item.key)){
    currentScore = currentScore + 10;
  }
  if (item.key == 'star'){
    currentScore = currentScore + 20;
  }
  if (item.key == 'poison'){
    currentScore = currentScore - 25;
    poison_count += 1;
    if( poison_count === 2 ){
      winningMessage.text = "Try again, \n Click to restart";
      winningMessage.visible = true;
      game.input.onTap.addOnce(restart,this);
    }
  }
  if (currentScore >= winningScore && !show_award_flag) {
    show_award_flag = true;
    createBadge();
  }

}

// when the player collects the badge at the end of the game
function badgeHandler(player, badge) {
  badge.kill();
  won = true;
}



function badge_collector() {
  // navbar();
  game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
  
  // before the game begins
  function preload() {
    game.stage.backgroundColor = '#5db1ad';
    
    //Load images
    game.load.image('platform', './img/game/platform_1.png');
    game.load.image('platform2', './img/game/platform_2.png');
    
    //Load spritesheets
    game.load.spritesheet('player', './img/game/tom.png', 48, 62);
    game.load.spritesheet('coin', './img/game/coin.png', 36, 44);
    game.load.spritesheet('award2', './img/game/award2.png', 45, 54);
    game.load.spritesheet('badge', './img/game/badge.png', 42, 54);
    game.load.spritesheet('badge1', './img/game/badge1.png', 42, 54);
    game.load.spritesheet('badge2', './img/game/badge2.png', 42, 54);
    game.load.spritesheet('badge3', './img/game/badge3.png', 42, 54);
    game.load.spritesheet('badge4', './img/game/badge4.png', 36, 44);
    game.load.spritesheet('badge5', './img/game/badge5.png', 42, 54);
    game.load.spritesheet('badge8', './img/game/badge8.png', 42, 54);
    game.load.spritesheet('hackday', './img/game/hackday.png', 42, 54);
    game.load.spritesheet('poison', './img/game/poison.png', 32, 32);
    game.load.spritesheet('award', './img/game/award.png', 32, 32);
    game.load.spritesheet('star', './img/game/star.png', 32, 32);
  }

  // initial game set up
  function create() {
    player = game.add.sprite(50, 600, 'player');
    player.animations.add('walk');
    player.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 500;

    addItems();
    addPlatforms();

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton2 = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.UP);

    text = game.add.text(16, 16, "SCORE: " + currentScore, { font: "bold 24px Arial", fill: "white" });
    winningMessage = game.add.text(game.world.centerX, 275, "", { font: "bold 48px Arial", fill: "white" });
    winningMessage.anchor.setTo(0.5, 1);
  }



  // while the game is running
  function update() {
    text.text = "SCORE: " + currentScore;
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, items, itemHandler);
    game.physics.arcade.overlap(player, badges, badgeHandler);
    player.body.velocity.x = 0;

    // is the left cursor key presssed?
    if (cursors.left.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = -300;
      player.scale.x = - 1;
    }
    // is the right cursor key pressed?
    else if (cursors.right.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = 300;
      player.scale.x = 1;
    }
    // player doesn't move
    else {
      player.animations.stop();
    }
    
    if ( (jumpButton.isDown || jumpButton2.isDown) && (player.body.onFloor() || player.body.touching.down)) {
      player.body.velocity.y = -400;
    }
    // when the player win the game
    if (won) {
      winningMessage.text = "YOU WIN!!!\n Click to restart";
      winningMessage.visible = true;
      game.input.onTap.addOnce(restart,this);
    }
  }
  function render() { }
};

function restart(){
  player.kill();
  items.removeAll();
  addItems();
  currentScore = 0;
  player.reset(50, 600);
  // scoreText.text = 'Score: ' + currentScore
  winningMessage.visible = false;
  won = false;
  show_award_flag=false;
}

// setup game when the web page loads
// window.onload = badge_collector;