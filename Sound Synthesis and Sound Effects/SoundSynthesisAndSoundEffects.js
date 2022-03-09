// Cameron Martin, March 2022
// Sound Synthesis and Sound Effects Assignment


// Variables
// Variable which holds whether or not Tone has been started
let toneStarted = false;

// Variables for LFOs' minimum and maximum frequencies
let minFreq = 600;
let maxFreq = 1200;

// Variables for Filters' cut off frequencies and filter types
let cutOffFreq = 1100;
let filterType = "highpass";

// Variables for image to display, name of image, and whether to display the image
let soundImage;
let imageName = "ambulance.jpg";
let displayImage = false;


// Create Sounds
// Initialize Oscillators for short and long bursts
let longOsc = new Tone.AMOscillator(600, 'sine', 'sine').start();
let shortOsc = new Tone.AMOscillator(600, 'sine', 'sine').start();

// Initialize Gains for short and long bursts, connect to Destination
let longGain = new Tone.Gain().toDestination();
let shortGain = new Tone.Gain().toDestination();

// Initialize Panners for short and long bursts, connect to respective Gains
let longPan = new Tone.Panner().connect(longGain);
let shortPan = new Tone.Panner().connect(shortGain);

// Initialize Envelopes for short and long bursts, connect to respective Panners
let longAmpEnv = new Tone.AmplitudeEnvelope({
  attack: 3,
  decay: 3,
  sustain: 1.0,
  release: 0.8
}).connect(longPan);
let shortAmpEnv = new Tone.AmplitudeEnvelope({
  attack: .01,
  decay: 3,
  sustain: 1.0,
  release: 0.8
}).connect(shortPan);

// Initialize Filters for short and long bursts, connect to respective Amplitude Envelopes
let longFilter = new Tone.Filter(cutOffFreq,filterType).connect(longAmpEnv);;
let shortFilter = new Tone.Filter(cutOffFreq,filterType).connect(shortAmpEnv);

// Connect Oscillators to their respective Filters
longOsc.connect(longFilter);
shortOsc.connect(shortFilter);

// Initialize LFOs for short and long bursts and connect to respective Oscillator Frequencies
let longLFO = new Tone.LFO('1m', minFreq, maxFreq).start().connect(longOsc.frequency);
let shortLFO = new Tone.LFO('4n', minFreq, maxFreq).start().connect(shortOsc.frequency);


// Functions
// Load image
function preload()
{
  soundImage = loadImage(imageName);
}

// Create Canvas slightly smaller than the Window
function setup() 
{
  createCanvas(windowWidth-5,windowHeight-5);
}

// Show instructions and draw image if necessary
function draw() 
{
  background(255);

  // Display instructions in the middle of the screen
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Press and hold the mouse button!",width/2,height/2);
  
  // If the mouse is currently being held, display the image in the middle of the screen
  if(displayImage)
  {
    imageMode(CENTER);
    image(soundImage,width/2,height/2,width/2,height/2);
  }
}

// If a key is pressed, start Tone
function keyPressed()
{
  if(!toneStarted) 
  {
    Tone.start();
    Tone.context.resume();
    toneStarted = true;
  }
}

// If the mouse is pressed, start Tone, play the audio, and set image to display
function mousePressed()
{
  if(!toneStarted) 
  {
    Tone.start();
    Tone.context.resume();
    toneStarted = true;
  }


  // Trigger a long burst, then a short burst, then a long burst again
  longAmpEnv.triggerAttackRelease(5);
  shortAmpEnv.triggerAttackRelease(5,"+5");
  longAmpEnv.triggerAttackRelease(5,"+10");

  // Set image to display
  displayImage = true;
}

// If the mouse is released, set image to stop displaying
function mouseReleased()
{
  displayImage = false;
}