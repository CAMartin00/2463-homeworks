// Cameron Martin, February 2022
// Sprite Animation Assignment

// Variables for canvas width and height
let canvasWidth = 600;
let canvasHeight = 600;

// Variables to hold sprite sheets
let spelunkyGuy;
let spelunkyGreen;
let goldenMonk;
let spelunkyPurple;

// Variables to instantiate as Characters
let playerOne;
let playerTwo;
let playerThree;
let playerFour;

// Variable for size of sprites in sheet
let spriteX = 80;
let spriteY = 80;

// Variables for player start positions
let startOneX = 40;
let startOneY = 40;
let startTwoX = 560;
let startTwoY = 40;
let startThreeX = 40;
let startThreeY = 560;
let startFourX = 560;
let startFourY = 560;

// Class for characters
class Character
{
  constructor(spriteSheet,posX,posY)
  {
    this.posX = posX;
    this.posY = posY;
    this.spriteSheet = spriteSheet;
    this.spriteOffX = 0;
    this.spriteOffY = 0;
    this.facing = 1;
    this.moveSpeed = 1;
  }

  // Draw the character, to be called in draw()
  draw()
  {
    scale(facing,1);
    image(this.spriteSheet,this.posX,this.posY,spriteX,spriteY,this.spriteOffX,this.spriteOffY,spriteX,spriteY);
  }

  moveUp()
  {
    if(this.posY - this.moveSpeed >= this.height/2)
    {
      this.moveX = 0;
      this.moveY = 1;
    }
  }

  moveDown()
  {
    if(this.posY + this.moveSpeed <= canvasHeight - this.height/2)
    {
      this.moveX = 0;
      this.moveY = -1;
    }
  }

  moveLeft()
  {
    if(this.posX - this.moveSpeed >= this.width/2)
    {
      this.facing = -1;
      this.moveY = 0;
      this.moveX = -1;
    }
  }

  moveRight()
  {
    if(this.posX + this.moveSpeed <= canvasWidth - this.width/2)
    {
      this.facing = 1;
      this.moveY = 0;
      this.moveX = 1;
    }
  }
}


// Load sprite sheets for Spelunky Guy, Green, Golden Monk, and Purple
function preload()
{
  spelunkyGuy = loadImage("SpelunkyGuy.png");
  spelunkyGreen = loadImage("Green.png");
  goldenMonk = loadImage("GoldenMonk.png");
  spelunkyPurple = loadImage("Purple.png");
}

// Create canvas size of window
function setup() 
{
  playerOne = new Character(spelunkyGuy,startOneX,startOneY);
  playerTwo = new Character(spelunkyGreen,startTwoX,startTwoY);
  playerThree = new Character(goldenMonk,startThreeX,startThreeY);
  playerFour = new Character(spelunkyPurple,startFourX,startFourY);
  createCanvas(canvasWidth,canvasHeight);
  imageMode(CENTER);
}

// Draw the characters at their current positions
function draw() 
{
  background(255);
  fill(200);
  rect(100,100,20,20);
  playerOne.draw();
  playerTwo.draw();
  playerThree.draw();
  playerFour.draw();
  fill(100);
  rect(100,100,20,20);
}

// When a key is pressed, move the related character
function keyPressed()
{
// Player 1 (wasd)
  // Pressing w causes Player 1 to move up
  if(keyCode == 87)
  {
    playerOne.moveUp();
  }
  // Pressing s causes Player 1 to move down
  else if(keyCode == 83)
  {
    playerOne.moveDown();
  }
  // Pressing a causes Player 1 to move left
  else if(keyCode == 65) 
  {
    playerOne.moveLeft();
  }
  // Pressing d causes Player 1 to move right
  else if(keyCode == 68)
  {
    playerOne.moveRight();
  }
  // Providing no input for Player 1 causes them to become idle
  else
  {
    //playerOne.setIdle();
  }

// Player 2 (tfgh)
  // Pressing t causes Player 2 to move up
  if(keyCode == 84)
  {
    playerTwo.moveUp();
  }
  // Pressing g causes Player 2 to move down
  else if(keyCode == 71)
  {
    playerTwo.moveDown();
  }
  // Pressing f causes Player 2 to move left
  else if(keyCode == 70) 
  {
    playerTwo.moveLeft();
  }
  // Pressing h causes Player 2 to move right
  else if(keyCode == 72)
  {
    playerTwo.moveRight();
  }
  // Providing no input for Player 2 causes them to become idle
  else
  {
    //playerTwo.setIdle();
  }

// Player 3 (ijkl)
  // Pressing i causes Player 3 to move up
  if(keyCode == 73)
  {
    playerThree.moveUp();
  }
  // Pressing k causes Player 3 to move down
  else if(keyCode == 75)
  {
    playerThree.moveDown();
  }
  // Pressing j causes Player 3 to move left
  else if(keyCode == 74) 
  {
    playerThree.moveLeft();
  }
  // Pressing l causes Player 3 to move right
  else if(keyCode == 76)
  {
    playerThree.moveRight();
  }
  // Providing no input for Player 3 causes them to become idle
  else
  {
    //playerTwo.setIdle();
  }

// Player 4 (Arrow Keys)
  // Pressing up causes Player 4 to move up
  if(keyCode == 38)
  {
    playerFour.moveUp();
  }
  // Pressing down causes Player 4 to move down
  else if(keyCode == 40)
  {
    playerFour.moveDown();
  }
  // Pressing left causes Player 4 to move left
  else if(keyCode == 37) 
  {
    playerFour.moveLeft();
  }
  // Pressing right causes Player 4 to move right
  else if(keyCode == 39)
  {
    playerFour.moveRight();
  }
  // Providing no input for Player 4 causes them to become idle
  else
  {
    //playerFour.setIdle();
  }
}