/* 
Youtube Link:
https://www.youtube.com/watch?v=NjCJ3cb02RY

Cameron Martin, April 2022
Serial Communication Assignment
*/

// Variable for background color (Starts Black, becomes White)
let backgroundColor;

// Variables for serialPDM and name of port
let serialPDM;
let portName = "COM5";

// Create 600 x 600 canvas
function setup() 
{
  backgroundColor = color(0,0,0);
  // Initialize serialPDM with portName
  serialPDM = new PDMSerial(portName);

  // Create 600 x 600 canvas
  createCanvas(windowWidth,windowHeight -4);
}

// Repeatedly update background color according to Potentiometer reading
function draw() 
{
  // Set backgroundColor to the value of pot from serial
  let val = serialPDM.sensorData.pot;
  backgroundColor = color(val, val, val);

  // Draw background of backgroundColor
  background(backgroundColor);
}

// On mouse click, toggle the LED on the Arduino
function mouseClicked()
{
  serialPDM.transmit('led');
}