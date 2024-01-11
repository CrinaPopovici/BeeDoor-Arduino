#include <DHT.h>
#include <Stepper.h>

#define DHTPIN 2
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

#define IN1 8
#define IN2 9
#define IN3 10
#define IN4 11

const int stepsPerRevolution = 64;
///const int steptPerRevolutionSun = 256;
Stepper myStepper(stepsPerRevolution, IN1, IN3, IN2, IN4);

// Add a variable to keep track of whether the motor has been rotated
bool motorRotated = false;

void setup() {
  Serial.begin(9600);
  dht.begin();
  myStepper.setSpeed(5);
}

void loop() {
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();

  if (temperature >= 28 && !motorRotated) {
    //Serial.println("Temperature is above 24.5C, rotating stepper motor.");
    for (int i = 0; i < 2; i++) {
      myStepper.step(stepsPerRevolution);
      delay(500);
    }

    // Update the motorRotated variable after rotating the motor
    motorRotated = true;
  }

  Serial.print(" ");
  Serial.print(temperature);
  Serial.print(" ");
  Serial.print(humidity);
  Serial.print("\n");




    if (Serial.available() > 0) {
    String command = Serial.readStringUntil('\n');
    command.trim();
    command.replace("\n", "");
    command.replace("\r", "");

    if (command == "STARTSALCAM") {
      Serial.println("Received START command. Starting motor.");
      for (int i = 0; i < 2; i++) {
        myStepper.step(stepsPerRevolution);
        delay(500);
      }
    } else if (command == "STOPSALCAM") {
      Serial.println("Received STOP command. Stopping motor.");
      for (int i = 0; i < 2; i++) {
        myStepper.step(-stepsPerRevolution);
        delay(500);
      }
    } else if (command == "STARTFLOAREASOARELUI") {
      Serial.println("Received STOP command. Stopping motor.");
      for (int i = 0; i < 2; i++) {
        myStepper.step(stepsPerRevolution/2);
        delay(500);
      }
    }  else if (command == "STOPFLOAREASOARELUI") {
      Serial.println("Received STOP command. Stopping motor.");
      for (int i = 0; i < 2; i++) {
        myStepper.step(-stepsPerRevolution/2);
        delay(500);
      }
    }
  }

  delay(5000);
}
