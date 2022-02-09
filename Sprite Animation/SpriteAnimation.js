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

  // Constructor for characters
  constructor(spriteSheet,posX,posY)
  {

    // Spritesheet variables
    this.spriteOffX = 0;
    this.spriteOffY = 0;
    this.spriteSheet = spriteSheet;

    // Position and Scaling variables
    this.posX = posX;
    this.posY = posY;
    this.facing = 1;   
    
    // Movement variables
    this.moveSpeed = 2;
    this.moveX = 0;
    this.moveY = 0;
  }

  // Function to draw character
  draw()
  {

    // Center sketching on position and flip horizontally if necessary
    translate(this.posX,this.posY);
    scale(this.facing,1);

    // Draw sprite
    image(this.spriteSheet,0,0,spriteX,spriteY,this.spriteOffX*spriteX,this.spriteOffY*spriteY,spriteX,spriteY);

    // Iterate to next sprite if necessary
    if(frameCount % 5 == 0)
    {
      if(this.moveX != 0) 
      {

        // Set Y to 0 for walking
        this.spriteOffY = 0;
        this.spriteOffX = (this.spriteOffX + 1) % 9;
      }
      else if(this.moveY != 0) 
      {

        // Set Y to 7 for walking
        this.spriteOffY = 7;
        this.spriteOffX = (this.spriteOffX + 1) % 10;
      }
      
      // Set to idle position, but don't change to climbing/walking, stay in same mode
      else this.spriteOffX = 0;
    }

    // Reset sketching position and unflip horizontally if necessary
    scale(this.facing,1);
    translate(-this.posX,-this.posY);

    // Calculate new position
    this.posX += this.moveX * this.moveSpeed;
    this.posY += this.moveY * this.moveSpeed;

    // Handle minimum and maximum positions
    if(this.posX < spriteX/2) this.posX = spriteX/2;
    else if(this.posX > canvasWidth - spriteX/2) this.posX = canvasWidth - spriteX/2;
    if(this.posY < spriteY/2) this.posY = spriteY/2;
    else if(this.posY > canvasHeight - spriteY/2) this.posY = canvasHeight - spriteY/2;
  }

  // Functions to handle movement of sprite
  moveUp()
  {
      this.moveX = 0;
      this.moveY = -1;
  }

  moveDown()
  {
      this.moveX = 0;
      this.moveY = 1;
  }

  moveLeft()
  {
      this.facing = -1;
      this.moveY = 0;
      this.moveX = -1;
  }

  moveRight()
  {
      this.facing = 1;
      this.moveY = 0;
      this.moveX = 1;
  }

  stopMove()
  {
    this.moveY = 0;
    this.moveX = 0;
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
  playerOne.draw();
  playerTwo.draw();
  playerThree.draw();
  playerFour.draw();
}

// When a key is pressed, move the related character
function keyPressed()
{
// Player 1 (wasd)
  // Pressing w causes Player 1 to move up
  if(keyCode == 87) playerOne.moveUp();
  
  // Pressing s causes Player 1 to move down
  else if(keyCode == 83) playerOne.moveDown();
  
  // Pressing a causes Player 1 to move left
  else if(keyCode == 65)  playerOne.moveLeft();
  
  // Pressing d causes Player 1 to move right
  else if(keyCode == 68) playerOne.moveRight();

// Player 2 (tfgh)
  // Pressing t causes Player 2 to move up
  if(keyCode == 84) playerTwo.moveUp();
  
  // Pressing g causes Player 2 to move down
  else if(keyCode == 71) playerTwo.moveDown();
  
  // Pressing f causes Player 2 to move left
  else if(keyCode == 70)  playerTwo.moveLeft();
  
  // Pressing h causes Player 2 to move right
  else if(keyCode == 72) playerTwo.moveRight();

// Player 3 (ijkl)
  // Pressing i causes Player 3 to move up
  if(keyCode == 73) playerThree.moveUp();
  
  // Pressing k causes Player 3 to move down
  else if(keyCode == 75) playerThree.moveDown();
  
  // Pressing j causes Player 3 to move left
  else if(keyCode == 74) playerThree.moveLeft();
  
  // Pressing l causes Player 3 to move right
  else if(keyCode == 76) playerThree.moveRight();

// Player 4 (Arrow Keys)
  // Pressing up causes Player 4 to move up
  if(keyCode == 38) playerFour.moveUp();
  
  // Pressing down causes Player 4 to move down
  else if(keyCode == 40) playerFour.moveDown();
  
  // Pressing left causes Player 4 to move left
  else if(keyCode == 37) playerFour.moveLeft();
  
  // Pressing right causes Player 4 to move right
  else if(keyCode == 39) playerFour.moveRight();
}

// When a key is released, stop the player who's input it was
function keyReleased()
{
  if(keyCode == 87 || keyCode == 83 || keyCode == 65 || keyCode == 68) 
  {
    playerOne.stopMove();
  }
  else if(keyCode == 84 || keyCode == 71 || keyCode == 70 || keyCode == 72)
  {
    playerTwo.stopMove();
  }
  else if(keyCode == 73 || keyCode == 75 || keyCode == 74 || keyCode == 76)
  {
    playerThree.stopMove();
  }
  else if(keyCode == 38 || keyCode == 40 || keyCode == 37 || keyCode == 39)
  {
    playerFour.stopMove();
  }
}