/* 
https://youtube.com/shorts/op5e5Yg1-uc?feature=share

Cameron Martin
CSC 2463 Physical Assignment 2
Analog I/O

Game Objective: The player is trying to get the LED as bright as possible by turning the potentiometer.
Rules: The Built-in LED will blink to indicate the starting of a new turn, then the player must turn the potentiometer to find where the LED is the brightest.
  Then, the Built-in LED will blink to indicate player 2's turn, who must also try to get the LED as bright as possible. 
  Whoever's light was brighter wins. If player 1 wins, the LED will turn solid, if player 2 wins it will turn off, 
  and if there is a perfect tie it will blink rapidly.
Challenge: The potentiometer has a sweet-spot selected randomly every time the dial is ready to turn, 
  so the player must be quick (5 second time limit) in finding it.
Interaction: The players interact with the game through the turning of the Potentiometer, which dictates the brightness of the LED (representing their score).
*/

int potPin = A0; // Potentiometer outputs to Analog In 0
int ledPin = 3; // LED input comes from Digital Pin 3 (PWM)

int potVal = 0; // Variable for current Potentiometer value
int potMin = 0; // Variable for minimum Potentiometer value
int potMax = 1023; // Variable for maximum Potentiometer value

int outVal = 0; // Variable for converted Potentiometer value for analog output
int targetVal = 500; // Target value for Potentiometer for brightest output

// Ints for player scores (their outVal)
int playerOneScore = 1;
int playerTwoScore = 1;

void setup() {
  pinMode(potPin, INPUT);
  pinMode(ledPin, OUTPUT);
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  // Blink Built-in LED for 5 seconds before player 1's turn
  while (millis() < 5000) {
    digitalWrite(LED_BUILTIN, HIGH);
    delay(100);
    digitalWrite(LED_BUILTIN, LOW);
    delay(100);
  }

  // Light Built-in LED while player 1 takes turn
  digitalWrite(LED_BUILTIN, HIGH);

  // Generate random value for targetVal for player 1's turn
  targetVal = random(potMin, potMax);

  // During player 1's turn (5 seconds), 
  while (millis() < 10000) {

    // Read in Potentiometer value
    potVal = analogRead(potPin);
    // Convert Potentiometer value to 0:255 for analog output
    if (potVal < targetVal) {
      outVal = map(potVal, potMin, targetVal, 0, 255);
    }
    else outVal = map(potVal, targetVal, potMax, 255, 0);

    // Set brightness of LED according to outVal
    analogWrite(ledPin, outVal);
  }

  // Save outVal as player 1's score
  playerOneScore = outVal;

  // Turn off LED after player 1's turn
  analogWrite(ledPin, 0);

  // Blink Built-in LED faster for 5 seconds before player 2's turn
  while (millis() < 15000) {
    digitalWrite(LED_BUILTIN, HIGH);
    delay(50);
    digitalWrite(LED_BUILTIN, LOW);
    delay(50);
  }

  // Light Built-in LED while player 2 takes turn
  digitalWrite(LED_BUILTIN, HIGH);

  // Generate random value for targetVal for player 2's turn
  targetVal = random(potMin, potMax);

  // During player 2's turn (5 seconds), 
  while (millis() < 20000) {

    // Read in Potentiometer value
    potVal = analogRead(potPin);
    // Convert Potentiometer value to 0:255 for analog output
    if (potVal < targetVal) {
      outVal = map(potVal, potMin, targetVal, 0, 255);
    }
    else outVal = map(potVal, targetVal, potMax, 255, 0);

    // Set brightness of LED according to outVal
    analogWrite(ledPin, outVal);
  }

  // Save outVal as player 2's score
  playerTwoScore = outVal;

  // Turn off LED after player 2's turn
  analogWrite(ledPin, 0);

  // Blink Built-in LED rapidly for 5 seconds before announcing winner
  while (millis() < 25000) {
    digitalWrite(LED_BUILTIN, HIGH);
    delay(25);
    digitalWrite(LED_BUILTIN, LOW);
    delay(25);
  }

  // If player 1 is the victor, the LED will turn on
  if (playerOneScore > playerTwoScore) {
    while (true) analogWrite(ledPin, 255);
  }
  // If player 2 is the victor, the LED will stay off
  else if (playerOneScore < playerTwoScore) {
    while (true) analogWrite(ledPin, 0);
  }
  // If the players tie, the LED will blink
  else {
    while (true) {
      analogWrite(ledPin, 255);
      delay(100);
      analogWrite(ledPin, 0);
      delay(100);
    }
  }
}
