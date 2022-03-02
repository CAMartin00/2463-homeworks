// Cameron Martin, February 2022
// Create A Sampler Assignment

// Variable which holds whether or not Tone has been started
let toneStarted = false;

// Object of all sounds
let sounds = new Tone.Players({
  Plonk: "https://tonejs.github.io/audio/berklee/DroppingCoins1.mp3",
  Glass: "https://tonejs.github.io/audio/berklee/GlassBreak1.mp3",
  Laser: "https://tonejs.github.io/audio/berklee/Resonant_FM_laser1.mp3",
  Wrench: "https://tonejs.github.io/audio/berklee/allen_wrench_2.mp3"
});

// Array of all buttons
let buttons = [];

// Array of all sound names
let soundNames = ["Plonk","Glass","Laser","Wrench"];

// Variables for Feedback Delay effect, Chebyshev
let delay = new Tone.FeedbackDelay("2n", .5);
let cheb = new Tone.Chebyshev(1);

// Variables for sliders and selector for effects
let sliderDelay;
let sliderFeedback;
let sliderWet;
let selecterOrder;

function setup() 
{
  // Create canvas size of window
  createCanvas(windowWidth-5,windowHeight-5);
  
  // Connect sounds to delay, delay to chebyshev, then output chebyshev audio
  sounds.connect(delay);
  delay.connect(cheb);
  cheb.toDestination();

  // Create the slider for Delay
  sliderDelay = createSlider(0.0,1.0,.5,.05);
  sliderDelay.position(windowWidth/3 - 40,windowHeight/3 - 50);
  sliderDelay.mouseReleased( () => {
    delay.delayTime.value = sliderDelay.value();
  });

  // Create slider for Feedback
  sliderFeedback = createSlider(0,1,.5,.05);
  sliderFeedback.position(2*windowWidth/3 - 40,windowHeight/3 - 50);
  sliderFeedback.mouseReleased( () => {
    delay.feedback.value = sliderFeedback.value();
  });

  // Create slider for Wetness
  sliderWet = createSlider(0.0,1.0,.5,.05);
  sliderWet.position(windowWidth/3 - 40,2*windowHeight/3 + 50);
  sliderWet.mouseReleased( () => {
    delay.wet = sliderWet.value();
  });

  // Create Selecter for Chebyshev
  selecterOrder = createSelect();
  selecterOrder.position(2*windowWidth/3 + 15,2*windowHeight/3 + 50)
  selecterOrder.option(1);
  selecterOrder.option(2);
  selecterOrder.option(3);
  selecterOrder.changed( () => {
    cheb.order = parseInt(selecterOrder.value());
  });


  // Create buttons for each sound
  soundNames.forEach((word,index) => {
    buttons[index] = createButton(word);
    buttons[index].position((index%2 + 1)*(windowWidth/3), (floor(index/2) + 1)*(windowHeight/3));
    buttons[index].mousePressed( () => playSound(word));
  });
}

// Play a sound from the sounds object, defaulting to the "Plonk" sound
function playSound(theSound = "Plonk")
{
  sounds.player(theSound).start();
}

function draw() 
{
  background(255);
  fill(0);
  textAlign(CENTER, CENTER);

  // Create Effects Sliders/Selecter text
  textSize(24);
  text("This slider modifies the delay. \n[0,1]",windowWidth/3+25,windowHeight/3 - 80);
  text("This slider modifies the feedback. \n[0,1]",2*windowWidth/3+25,windowHeight/3 - 80);
  text("This slider modifies the wetness. \n[0,1]",windowWidth/3+25,2*windowHeight/3 + 100);
  text("This selecter modifies the \norder of the Chebyshev waveshaper.",2*windowWidth/3+25,2*windowHeight/3 + 100);

  // Create Sampler Buttons text
  textSize(32);
  text("Press these buttons to play sounds!",windowWidth/2,windowHeight/2);
}

// If a key is pressed or the mouse is pressed, start Tone
function keyPressed()
{
  if(!toneStarted) 
  {
    Tone.start();
    toneStarted = true;
  }
}

function mousePressed()
{
  if(!toneStarted) 
  {
    Tone.start();
    toneStarted = true;
  }
}