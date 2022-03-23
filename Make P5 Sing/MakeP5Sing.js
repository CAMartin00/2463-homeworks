// Cameron Martin, March 2022
// Make P5 Sing Assignment

// DISCLAIMER //
// The music that has been added is very simple, as I am by no means a musician.
// There is no music during the waiting section (as an input is required to start tone, which will start the game)
// The music during the playing section loops, the loop occurs sooner as the speed
// of the bugs increases, giving it an offtune and creepy feeling as the bugs skitter faster.
// There is no music during the finished section to show my ability to stop the music

// AUDIO START SECTION //

// Variable for whether Tone has been started yet
let toneStarted = false;

// Variables for sound effects
let roboGo;
let squish;
let buzzer;

// Variable for synth for background music
let synth;

// Loop for Wait, Playing, and Finish gamestate songs
let songLoop;

// GRAPHICS START SECTION //

// Game State variable
let gameState = "Wait";

// Variables for game area width and height and canvas area width and height (area at bottom for score and timer)
let gameWidth = 600;
let gameHeight = 600;
let canvasWidth = gameWidth;
let canvasHeight = gameHeight + 100;

// Variables to hold sprite sheets
let roachSprite;

// Variable for size of sprites in sheet
let spriteX = 80;
let spriteY = 80;

// Array to select random cardinal or intercardinal direction from
let moveDirs = [-1,0,1];

// Variable for Bug Move Speed
let moveSpeed = 1;

// Variable and array for creating bugs
let numBugs = 10;
let bugs = [];

// Variables for timer and score
let timeLeft;
let score;

// Class for bugs
class Bug
{

  // Constructor for bugs
  constructor(spriteSheet)
  {

    // Spritesheet variables
    this.spriteOffX = 0;
    this.spriteOffY = 0;
    this.isDead = false;
    this.deadFor = 0;
    this.spriteSheet = spriteSheet;

    // Position variables
    this.posX = Math.floor(random(50,550));
    this.posY = Math.floor(random(50,550));
    
    // Movement variables
    this.moveX = random(moveDirs);
    this.moveY = random(moveDirs);

    // Make sure bug is moving
    if(this.moveX == 0 & this.moveY == 0)
    {
      let randomVar = random(1,100);
      if(randomVar <= 25) this.moveX = -1
      else if(randomVar <= 50) this.moveX = 1;
      else if(randomVar <= 75) this.moveY = -1;
      else this.moveY = 1;
    }

    // Determine facing direction based on movement
    this.calcFacing();
  }

  // Function to draw bug
  draw()
  {
    // Center sketching on position and rotate to facing direction
    translate(this.posX,this.posY);
    rotate(this.facing*PI/4);

    // Draw sprite
    image(this.spriteSheet,0,0,spriteX,spriteY,this.spriteOffX*spriteX,this.spriteOffY*spriteY,spriteX,spriteY);

    // If the bug isn't dead
    if(!this.isDead)
    {
      // Iterate to next sprite 15/30/60 times per second (increase every 15 bugs squished)
      if(frameCount % (4 / moveSpeed) == 0)
      {
        if(this.moveX != 0 || this.moveY != 0) 
        {

          // Set Y to 0 for walking
          this.spriteOffY = 0;
          this.spriteOffX = (this.spriteOffX + 1) % 8;
        }
      }
    }
    
    // 
    this.deathChecks();

    // Reset sketching position and rotation if necessary
    rotate(this.facing*-1*PI/4);
    translate(-this.posX,-this.posY);

    // Calculate new position if bug is alive
    if(!this.isDead)
    {
      this.posX += this.moveX * moveSpeed;
      this.posY += this.moveY * moveSpeed;
    }

    // Handle minimum and maximum positions, the bugs bounce off the boundaries
    if(!this.isDead)
    {
      if(this.posX < spriteX/2) 
      {
        this.posX = spriteX/2;
        this.moveX = 1;
      }
      else if(this.posX > gameWidth - spriteX/2) 
      {
        this.posX = gameWidth - spriteX/2;
        this.moveX = -1;
      }

      if(this.posY < spriteY/2) 
      {
        this.posY = spriteY/2;
        this.moveY = 1;
      }
      else if(this.posY > gameHeight - spriteY/2) 
      {
        this.posY = gameHeight - spriteY/2;
        this.moveY = -1;
      }
      this.calcFacing();
    }
  }

  // Handles changing the squished sprite to the dead sprite and stopping movement, then deleting it after several seconds
  deathChecks()
  {
    if(this.isDead)
    {
      this.spriteOffY = 1;
      this.moveX = 0;
      this.moveY = 0;
      if(frameCount % 30 == 0)
      {    
        if(this.spriteOffX < 1)
        {
          this.spriteOffX = 1;
        }
        this.deadFor += 1;
      }
    }
  }


  // Determine facing direction of bug (0-7) to multiply during rotation
  calcFacing()
  {
    switch(true)
    {

      // Up
      case (this.moveX == 0 && this.moveY == -1):
        this.facing = 0;
        break;

      // Up and Right
      case (this.moveX == 1 && this.moveY == -1):
        this.facing = 1;
        break;

      // Right
      case (this.moveX == 1 && this.moveY == 0):
        this.facing = 2;
        break;

      // Down and Right
      case (this.moveX == 1 && this.moveY == 1):
        this.facing = 3;
        break;

      // Down
      case (this.moveX == 0 && this.moveY == 1):
        this.facing = 4;
        break;

      // Down and Left
      case (this.moveX == -1 && this.moveY == 1):
        this.facing = 5;
        break;

      // Left
      case (this.moveX == -1 && this.moveY == 0):
        this.facing = 6;
        break;

      // Up and Left
      case (this.moveX == -1 && this.moveY == -1):
        this.facing = 7;
        break;
    }
  }

  // Attempt to squish this bug
  squish()
  {
    // If this bug is alive and the mouse is over the bug...
    if(!this.isDead && mouseX >= this.posX -20 && mouseX <= this.posX +20 && mouseY >= this.posY -30 && mouseY <= this.posY +30)
    {
      
      // Mark this bug as dead, set its sprite to squished, 
      this.isDead = true;
      this.spriteOffX = 0;
      this.spriteOffY = 1;
      this.deathChecks();
      score += 1;

      // Play squish sound
      squish.start();
    }
  }
}

// Load sprite sheet for Roaches
function preload()
{
  roachSprite = loadImage("Roach.png");
}

function setup() 
{

  // Set up start, squish, and end sound effects
  roboGo = new Tone.Player("/robo_start.wav");
  roboGo.toDestination();

  squish = new Tone.Player("/bug_squish.wav");
  squish.toDestination();

  buzzer = new Tone.Player("/end_buzzer.mp3");
  buzzer.toDestination();

  // Initialize Synths
  synth = new Tone.Synth({
    oscillator: {
      type: "sine"
    }
  }).toDestination();

  songLoop = new Tone.Loop(function(time) {
    let now = Tone.now();
    synth.triggerAttackRelease("F5", "8n", now);
    synth.triggerAttackRelease("E5", "8n", now + .5);
    synth.triggerAttackRelease("D#5", "8n", now + 1);
    synth.triggerAttackRelease("D5", "8n", now + 1.5);

    synth.triggerAttackRelease("D#5", "4n", now + 2.5);
    synth.triggerAttackRelease("E5", "4n", now + 3.5);
    synth.triggerAttackRelease("F5", "4n", now + 4.5);

    synth.triggerAttackRelease("D#5", "4n", now + 5.5);
    synth.triggerAttackRelease("E5", "8n", now + 6.5);
    synth.triggerAttackRelease("F5", "8n", now + 7);
  }, "4m")


  // Initialize bugs, create bugs, and set text/image aligns
  for(var i = 0; i < numBugs; i++)
  {
    bugs.push(new Bug(roachSprite));
  }
  createCanvas(canvasWidth,canvasHeight);
  textAlign(CENTER);
  imageMode(CENTER);
}

function draw() 
{

  // Draw background and game area
  background(100);
  fill(100);
  rect(0,0,gameWidth,gameHeight);
  
  // While waiting to start...
  if(gameState == "Wait")
  {

    // Create start text
    fill(0);
    textSize(30);
    text("Click the Mouse (to enable sound)\nThen press Any Key to Begin",300,300);
  }
  
  // When Playing the game...
  else if(gameState == "Play")
  {
    
    // Draw all bugs
    for(var i = 0; i < numBugs; i++)
    {
      bugs[i].draw();
    }

    // Create Score and Time text at bottom of screen
    fill(0);
    textSize(15);
    text("Score: " + score, 100,650);
    text("Time Left: " + timeLeft, 500,650);

    // Once per second...
    if(frameCount % 60 == 0) 
    { 

      // Remove and respawn long-dead bugs
      cullBugs();

      // Decrement time
      timeLeft -= 1;

      // When no time is left, end the game, play a buzzer sound, and stop the music
      if(timeLeft == 0) 
      {
        gameState = "Finish"
        buzzer.start();
        songLoop.stop();
      }

      // After 15 points, the move speed doubles, then doubles again after 30 points
      if(score >= 30) 
      {
        moveSpeed = 4;
        songLoop.interval = "1m";
      }
      else if(score >= 15) 
      {
        moveSpeed = 2;
        songLoop.interval = "2m";
      }
    }
  }
  
  // If game is over...
  else if(gameState == "Finish")
  {

    // Create final score and game over text
    fill(0);
    textSize(30);
    text("Game Over!",300,300);
    text("Final Score: " + score, 300,400);
  }
}

function mouseClicked()
{
  if(!toneStarted) 
  {
    Tone.context.resume();
    toneStarted = true;
  }

  // While playing the game...
  if(gameState == "Play")
  {

    // Try to squish each bug
    for(var i = 0; i < numBugs; i++)
    {
      bugs[i].squish();
    }
  }
}

function keyPressed()
{
  if(!toneStarted) 
  {
    Tone.context.resume();
    toneStarted = true;
  }

  // If waiting to play...
  if(gameState == "Wait") 
  {

    // Start the game
    gameState = "Play";
    timeLeft = 30;
    moveSpeed = 1;
    score = 0;

    // Play Go sound
    roboGo.start();

    // Start music loop
    songLoop.start();
    Tone.Transport.start();
  }

  // If game is over...
  else if(gameState == "Finish") 
  {

    // Restart the game
    gameState = "Wait";
  }
}

function cullBugs()
{

  // If any bugs have been dead for too long
  for(var i = 0; i < numBugs; i++)
  {
    if(bugs[i].deadFor >= 5)
    {

      // Replace them with a new bug
      bugs.splice(i,1, new Bug(roachSprite));
    }
  }
}

