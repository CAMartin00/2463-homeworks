/*
https://www.youtube.com/watch?v=TTcHLgxGVEA

Cameron Martin
CSC 2463 Physical Assignment 1
Digital I/O

  indicatorLED = red LED on row 15 of breadboard
  onboardLED = on-board LED on Arduino
  
  morseButton = button on row 10 of breadboard
  offButton = button on row 35 of breadboard

When powered on: indicatorLED will flash solid for duration of message, onboardLED will blink a message in morse code
When morseButton is pressed: the morse code message will switch to the other (LED or JPL)
When offButton is pressed: both LEDs will turn off until button is pressed again
*/

// Unit Length (.5 seconds)
int uL = 500;

// Whether Toggle is On or Off for buttons 1 and 2
bool toggleOn1 = false;
bool toggleOn2 = true;

// Pins for indicatorLED and buttons
indicatorLED = 12;
morseButton = 2;
offButton = 3;

// . (1 unit)
void dit() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(uL);
  digitalWrite(LED_BUILTIN, LOW);

  // Intra-character Gap (1 unit)
  delay(uL);
}

// - (3 units)
void dah() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(3 * uL);
  digitalWrite(LED_BUILTIN, LOW);

  // Intra-character Gap (1 unit)
  delay(uL);
}

// Inter-character Gap (3 units [-1 for Intra-Character Gap after dits and dahs])
void ieGap() {
  delay(2 * uL);
}

// Word Gap (7 units [-1 for Intra-Character Gap after dits and dahs])
void wGap() {
  delay(6 * uL);
}

// Output "<CT> LED <AR>" to onboardLED
void ledMessage() {
  // -.-.- = <CT> 
  dah();
  dit();
  dah();
  dit();
  dah();

  // ==> Begin Transmission
  wGap();

  // .-.. = L
  dit();
  dah();
  dit();
  dit();

  ieGap();

  // . = E
  dit();

  ieGap();

  // -.. = D
  dah();
  dit();
  dit();

  // ==> LED
  wGap();

  // .-.-. = <AR>
  dit();
  dah();
  dit();
  dah();
  dit();

  // ==> Out
  wGap();
}

// Output "<CT> JPL <AR>" to onboardLED
void jplMessage() {
  // -.-.- = <CT> 
  dah();
  dit();
  dah();
  dit();
  dah();

  // ==> Begin Transmission
  wGap();
  
  // .--- = J
  dit();
  dah();
  dah();
  dah();

  ieGap();

  // .--. = P
  dit();
  dah();
  dah();
  dit();

  ieGap();

  // .-.. = L
  dit();
  dah();
  dit();
  dit();

  ieGap();
  
  // ==> LED
  wGap();

  // .-.-. = <AR>
  dit();
  dah();
  dit();
  dah();
  dit();

  // ==> Out
  wGap();
}

// If morseButton is pressed, swap which message will play
void swap1() {
  if(!toggleOn1) toggleOn1 = true;
  else toggleOn1 = false;
}

// If offButton is pressed, swap whether the LEDs will activate
void swap2() {
  if(!toggleOn2) toggleOn2 = true;
  else toggleOn2 = false;
}

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(indicatorLED, OUTPUT);

  // The buttons have interrupt enabled, so, if they are pressed, the Arduino will play through the current message then register the input.
  pinMode(morseButton, INPUT);
  attachInterrupt(digitalPinToInterrupt(morseButton), swap1, RISING);
  pinMode(offButton, INPUT);
  attachInterrupt(digitalPinToInterrupt(offButton), swap2, RISING);
}

void loop() {
  // If offButton has not been pressed (or been pressed an even number of times), light indicator light and play message
  if(toggleOn2) {
    
    // Turn on indicatorLED
    digitalWrite(indicatorLED, HIGH);
    delay(uL);

    // If morseButton has not been pressed (or been pressed an even number of times), play LED message
    if(!toggleOn1) ledMessage();
    // Otherwise, play JPL message
    else jplMessage();
    
    // Turn off indicatorLED
    digitalWrite(indicatorLED, LOW);
    delay(uL);    
  }
}
