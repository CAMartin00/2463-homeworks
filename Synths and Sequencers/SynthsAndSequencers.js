// Cameron Martin, March 2022
// Synths and Sequencers Assignment

// Variable which holds whether or not Tone has been started
let toneStarted = false;

// Variables for sliders and selector for effects and synth waveform
let sliderThirdShift;
let sliderFifthShift;
let selecterWaveform;

// Variable for Synth
let synth;

// Variable for Pitch Shifts
let thirdShift;
let thirdValue = 4;
let fifthShift;
let fifthValue = 7;

function setup() 
{

  // Create canvas size of window
  createCanvas(windowWidth-5,windowHeight-5);
  
  // Initialize Synth
  synth = new Tone.Synth({
    oscillator: {
      type: "sine"
    }
  });

  thirdShift = new Tone.PitchShift({
    pitch: 3
  });

  fifthShift = new Tone.PitchShift({
    pitch: 7
  });

  // Connect Synth to destination
  synth.connect(thirdShift);
  synth.connect(fifthShift);
  thirdShift.toDestination();
  fifthShift.toDestination();



  // Create slider for first pitch shift (default to major third)
  sliderThirdShift = createSlider(-12,12,4,1);
  sliderThirdShift.position(windowWidth/3 - 100,windowHeight/3 - 50);
  sliderThirdShift.mouseReleased( () => {
    thirdShift.pitch = sliderThirdShift.value();
    thirdValue = sliderThirdShift.value();
  });

  // Create the slider for second pitch shift (default to perfect fifth)
  sliderFifthShift = createSlider(-12,12,7,1);
  sliderFifthShift.position(2*windowWidth/3 - 40,windowHeight/3 - 50);
  sliderFifthShift.mouseReleased( () => {
    fifthShift.pitch = sliderFifthShift.value();
    fifthValue = sliderFifthShift.value();
  });

  // Create Selecter for Synth Waveform
  selecterWaveform = createSelect();
  selecterWaveform.position(windowWidth/2-45,2*windowHeight/3 + 50)
  selecterWaveform.option("sine");
  selecterWaveform.option("square");
  selecterWaveform.option("triangle");
  selecterWaveform.option("sawtooth");
  selecterWaveform.changed( () => {
    synth.oscillator.type = selecterWaveform.value();
  });
}

function draw() 
{
  background(255);
  fill(0);
  textAlign(CENTER, CENTER);

  // Create Effects Sliders/Waveform Selecter text
  textSize(24);
  text("This selecter modifies the \nwaveform of the synth.",windowWidth/2,2*windowHeight/3 + 100);
  text("These sliders change the pitch \nof the pitch shifts \n(4/7 for Major chord, \n3/7 for Minor chord). \n[-1 Octave, +1 Octave]",windowWidth/2,windowHeight/3 - 100);
  textSize(16);
  text("" + thirdValue + " semitones",windowWidth/3 - 35,windowHeight/3);
  text("" + fifthValue + " semitones",2*windowWidth/3 + 25,windowHeight/3);

  // Create Sampler Buttons text
  textSize(32);
  text("Z - , => C3 - C4 \nA - K => C4 - C5 \nQ - I => C5 - C6",windowWidth/2,windowHeight/2);
}

// If a key is pressed, start Tone and play the related note
function keyPressed()
{
  if(!toneStarted) 
  {
    Tone.start();
    Tone.context.resume();
    toneStarted = true;
  }
  // Z - , 
  if(keyCode == 90) synth.triggerAttackRelease("C3",1);
  else if(keyCode == 88) synth.triggerAttackRelease("D3",1);
  else if(keyCode == 67) synth.triggerAttackRelease("E3",1);
  else if(keyCode == 86) synth.triggerAttackRelease("F3",1);
  else if(keyCode == 66) synth.triggerAttackRelease("G3",1);
  else if(keyCode == 78) synth.triggerAttackRelease("A3",1);
  else if(keyCode == 77) synth.triggerAttackRelease("B3",1);
  else if(keyCode == 188) synth.triggerAttackRelease("C4",1);
  // A - K
  else if(keyCode == 65) synth.triggerAttackRelease("C4",1);
  else if(keyCode == 83) synth.triggerAttackRelease("D4",1);
  else if(keyCode == 68) synth.triggerAttackRelease("E4",1);
  else if(keyCode == 70) synth.triggerAttackRelease("F4",1);
  else if(keyCode == 71) synth.triggerAttackRelease("G4",1);
  else if(keyCode == 72) synth.triggerAttackRelease("A4",1);
  else if(keyCode == 74) synth.triggerAttackRelease("B4",1);
  else if(keyCode == 75) synth.triggerAttackRelease("C5",1);
  // Q - I
  else if(keyCode == 81) synth.triggerAttackRelease("C5",1);
  else if(keyCode == 87) synth.triggerAttackRelease("D5",1);
  else if(keyCode == 69) synth.triggerAttackRelease("E5",1);
  else if(keyCode == 82) synth.triggerAttackRelease("F5",1);
  else if(keyCode == 84) synth.triggerAttackRelease("G5",1);
  else if(keyCode == 89) synth.triggerAttackRelease("A5",1);
  else if(keyCode == 85) synth.triggerAttackRelease("B5",1);
  else if(keyCode == 73) synth.triggerAttackRelease("C6",1);
}

// If the mouse is pressed, start Tone
function mousePressed()
{
  if(!toneStarted) 
  {
    Tone.start();
    Tone.context.resume();
    toneStarted = true;
  }
}