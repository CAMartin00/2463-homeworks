// Cameron Martin, January 2022

/* This formatting is necessary for using the p5 constructor
which enables Instance Mode so that all 5 sketches
can be displayed on one page. */

// Example 1
var v = function(sketches) {

  // Equivalent to "function setup() {...}"
  sketches.setup = function() {
    /* Create 402 x X02 canvas to create 
    a 400 x X00 canvas with 1px of border */
    sketches.createCanvas(402, 202);
  };

  // Equivalent to "function draw() {...}"
  sketches.draw = function() {
    // Draw black background, acting as border when covered
    sketches.background(0);
    // Set color to desired background color
    sketches.fill(84,237,64);
    // Draw rect to fill desired canvas area
    sketches.rect(1,1,400,200);

    // Set color to white
    sketches.fill(255);
    // Draw circle
    sketches.ellipse(100,100,160,160);
    // Draw square
    sketches.rect(220,20,160,160)
  };
};
var myp5 = new p5(v, 'ex1');

// Example 2
var w = function(sketches) {

  sketches.setup = function() {
    sketches.createCanvas(402, 402);
  };

  sketches.draw = function() {
    sketches.background(0);
    sketches.fill(255);
    sketches.rect(1,1,400,400);

    // Disable borders
    sketches.noStroke();
    // Set color to semi-transparent red
    sketches.fill(255,0,0,100);
    // Draw red circle
    sketches.ellipse(200,134,200,200);
    // Set color to semi-transparent green
    sketches.fill(0,255,0,100);
    // Draw green circle
    sketches.ellipse(267,267,200,200)
    // Set color to semi-transparent blue
    sketches.fill(0,0,255,100);
    // Draw blue circle
    sketches.ellipse(134,267,200,200);
  };
};
var myp5 = new p5(w, 'ex2');

// Example 3
var x = function(sketches) {

  sketches.setup = function() {
    sketches.createCanvas(402, 202);
  };

  sketches.draw = function() {
    sketches.background(0);
    sketches.fill(0);
    sketches.rect(1,1,400,200);

    // Disable borders
    sketches.noStroke();
    // Set color to yellow
    sketches.fill(255,241,76);
    // Draw Pac-Man
    sketches.arc(101,101,160,160,-3/4 * Math.PI, 3/4 * Math.PI);
    // Set color to red
    sketches.fill(255,0,0);
    // Draw bottom half of Blinky
    sketches.rect(221,101,160,80);
    // Draw top half of Blinky
    sketches.arc(301,101,160,160,-Math.PI,0);
    // Set color to white
    sketches.fill(255);
    // Draw Blinky's eyes
    sketches.ellipse(261,101,50,50);
    sketches.ellipse(341,101,50,50);
    // Set color to blue
    sketches.fill(0,0,255);
    // Draw Blinky's irises
    sketches.ellipse(261,101,30,30);
    sketches.ellipse(341,101,30,30); 
  };
};
var myp5 = new p5(x, 'ex3');

// Example 4
var y = function(sketches) {

  sketches.setup = function() {
    sketches.createCanvas(402, 402);
  };

  sketches.draw = function() {
    sketches.background(0);
    sketches.fill(0,0,140);
    sketches.rect(1,1,400,400);

    // Set border color to white
    sketches.stroke(255);
    // Set border strength
    /* This stroke weight is too high for some points to be fine, 
    but is necessary for the proportion of the border */
    sketches.strokeWeight(4);
    // Set color to dark green
    sketches.fill(0,140,0);
    // Draw circle
    sketches.ellipse(201,201,200,200);
    // Set color to red
    sketches.fill(255,0,0);
    // Draw star, starting at top and working clockwise
    sketches.beginShape();
    sketches.vertex(201,95); // Outer Top
    sketches.vertex(226,166); // Inner Top Right
    sketches.vertex(301,166); // Outer Top Right
    sketches.vertex(237,215); // Inner Bottom Right
    sketches.vertex(265,285); // Outer Bottom Right
    sketches.vertex(201,250); // Inner Bottom
    sketches.vertex(137,285); // Outer Bottom Left
    sketches.vertex(160,215); // Inner Bottom Left
    sketches.vertex(100,166); // Outer Top Left
    sketches.vertex(176,166); // Inner Top Left
    sketches.vertex(201,95); // Outer Top
    sketches.endShape();
  };
};
var myp5 = new p5(y, 'ex4');