/*
Youtube Link:
https://www.youtube.com/watch?v=NjCJ3cb02RY

Cameron Martin, April 2022
Serial Communication Assigment
*/

#include "PDMSerial.h"

PDMSerial pdm;

const int analogPin = A0;  // Analog input for Potentiometer
const int ledPin = 3; // PWM enabled output for LED

int potVal = 0; // Unmapped Potentiometer value, start at 0 (0-1023)
int potOut = 0; // Mapped Potentiometer value, start at 0 (0-255)

int ledOn = LOW; // Whether led should be on, start off

// Set up analogPin as input and ledPin as output, begin Serial communication
void setup() {
  pinMode(analogPin, INPUT);
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, ledOn);
  Serial.begin(9600);
}

// Read in potVal, map it for potOut, then transmit potOut. If new serial communication has occured with the name "led", toggle ledOn and write to ledPin
void loop() {
  // Read in potentiometer value, map it to 0-255 for use as a color value
  potVal = analogRead(analogPin);
  potOut = map(potVal, 0, 1023, 0, 255);
  
  // Transmit potOut
  pdm.transmitSensor("pot", potOut);
  pdm.transmitSensor("end");

  // If new data comes in with the name "led", toggle ledOn and output to ledPin
  boolean newData = pdm.checkSerial();
  if(newData) {
    if(pdm.getName().equals(String("led"))) {
      // Switch ledOn
      if(ledOn == LOW) ledOn = HIGH;
      else ledOn = LOW;

      // Update ledPin
      digitalWrite(ledPin, ledOn);
    }
  }
}
