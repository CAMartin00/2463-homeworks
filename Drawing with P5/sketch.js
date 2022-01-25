// Cameron Martin, January 2022

/* This formatting is necessary for using the p5 constructor
which enables Instance Mode so that all 5 sketches
can be displayed on one page. */

// Example 1
var v = function(sketches) {

  // Equivalent to "function setup() {...}"
  sketches.setup = function() {
    /* Create 402x402 canvas to create 
    a 400x400 canvas with 1px of border */
    sketches.createCanvas(402, 402);
  };

  // Equivalent to "function draw() {...}"
  sketches.draw = function() {
    // Draw black background, acting as border when covered
    sketches.background(0);
    // Set color to desired background color
    sketches.fill(220);
    // Draw rect to fill desired canvas area
    sketches.rect(1,1,400,400);
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
    sketches.fill(220);
    sketches.rect(1,1,400,400);
  };
};
var myp5 = new p5(w, 'ex2');

// Example 3
var x = function(sketches) {

  sketches.setup = function() {
    sketches.createCanvas(402, 402);
  };

  sketches.draw = function() {
    sketches.background(0);
    sketches.fill(220);
    sketches.rect(1,1,400,400);
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
    sketches.fill(220);
    sketches.rect(1,1,400,400);
  };
};
var myp5 = new p5(y, 'ex4');

// Example 5
var z = function(sketches) {

  sketches.setup = function() {
    sketches.createCanvas(402, 402);
  };

  sketches.draw = function() {
    sketches.background(0);
    sketches.fill(220);
    sketches.rect(1,1,400,400);
  };
};
var myp5 = new p5(z, 'ex5');