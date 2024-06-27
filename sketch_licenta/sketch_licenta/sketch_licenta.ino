#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>
#include <ESP8266WebServer.h>
#include <SimpleDHT.h>
#include <Servo.h>

#define REED_PIN_DOOR_CLOSED D1 
#define REED_PIN_DOOR_OPENED D2 

const int dht_pin = D7;
const int dht_pin_outside = D5;

SimpleDHT11 dht11;
SimpleDHT11 dht11Outside;

Servo door;

const char* ssid = "Seco";
const char* password = "secosanpq1";

#define FIREBASE_HOST "beedoor-69390-default-rtdb.europe-west1.firebasedatabase.app"
#define FIREBASE_AUTH "oOnZA353tT4hjq1KMeZsITsWeRHHnvqNjZ3U7245"

FirebaseData firebaseData;
FirebaseConfig firebaseConfig;
FirebaseAuth firebaseAuth;

ESP8266WebServer server(80);

void openDoor() {
  door.attach(D0, 500, 2400); 
  int pos = 90;
  door.write(pos);
  delay(15);
  door.detach();
}

void closeDoor() {
  door.attach(D0, 500, 2400); 
  int pos = 180;
  door.write(pos);
  delay(15);
  door.detach();
}

unsigned long previousMillis1 = 0; 
unsigned long previousMillis2 = 0; 
const long interval1 = 1000;       
const long interval2 = 600000;    

void loopEverySecond() {
  
  byte temperature = 0;
  byte humidity = 0;
  int err = dht11.read(dht_pin, &temperature, &humidity, NULL);
  if (err != SimpleDHTErrSuccess) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }
  byte temperatureOutside = 0;
  byte humidityOutside = 0;
  int errOutside = dht11Outside.read(dht_pin_outside, &temperatureOutside, &humidityOutside, NULL);
  if (errOutside != SimpleDHTErrSuccess) {
    Serial.println("Failed to read from outside DHT sensor!");
    return;
  }
  Firebase.setFloat(firebaseData, "/indoor/temperature", temperature);
  Firebase.setFloat(firebaseData, "/indoor/humidity", humidity);
  Firebase.setFloat(firebaseData, "/outdoor/temperature", temperatureOutside);
  Firebase.setFloat(firebaseData, "/outdoor/humidity", humidityOutside);

  int reedStateClosed = digitalRead(REED_PIN_DOOR_CLOSED); 
  if (reedStateClosed == LOW) {
    Firebase.setString(firebaseData, "/doorStatus", "closed");
  }
  int reedStateOpened = digitalRead(REED_PIN_DOOR_OPENED);
  if (reedStateOpened == LOW) {
    Firebase.setString(firebaseData, "/doorStatus", "opened");
  }
  if (Firebase.getString(firebaseData, "/commands/door")) {
    String doorCommand = firebaseData.stringData();
    Serial.println("Received command from Firebase: " + doorCommand);

    if (doorCommand == "open") {
      openDoor();
    } else if (doorCommand == "close") {
      closeDoor();
    }
  } else {
    Serial.println("Failed to get command from Firebase");
    Serial.println(firebaseData.errorReason());
  }
   if(temperatureOutside >= 34)
  {
      Firebase.setString(firebaseData, "/commands/door", "open");
      openDoor();
      Serial.println("Outdoor temperature is above 20°C succes opened door");
  }
   if(temperatureOutside <=30)
  {
      Firebase.setString(firebaseData, "/commands/door", "close");
      closeDoor();
      Serial.println("Outdoor temperature is under 8° succes closed door");
  }
}


void loopEveryTenMinutes(){

    byte temperatureOutside = 0;
    byte humidityOutside = 0;
    int errOutside = dht11Outside.read(dht_pin_outside, &temperatureOutside, &humidityOutside, NULL);
    if (errOutside != SimpleDHTErrSuccess) {
      Serial.println("Failed to read from outside DHT sensor!");
      return;
    }
    
  // if(temperatureOutside < 8)
  // {
  //     Firebase.setString(firebaseData, "/commands/door", "close");
  //     closeDoor();
  //     Serial.println("Outdoor temperature is under 8° succes closed door");
  // }
 
}

void setup() {
  Serial.begin(115200);
  delay(500);

  pinMode(REED_PIN_DOOR_CLOSED, INPUT_PULLUP); 
  pinMode(REED_PIN_DOOR_OPENED, INPUT_PULLUP);

  door.attach(D0, 500, 2400);
  door.write(180); 

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected.");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  firebaseConfig.host = FIREBASE_HOST;
  firebaseConfig.signer.tokens.legacy_token = FIREBASE_AUTH;

  Firebase.begin(&firebaseConfig, &firebaseAuth);
  Firebase.reconnectWiFi(true);
  Serial.println("Connected to Firebase");

}

void loop() {
  unsigned long currentMillis = millis();

  if (currentMillis - previousMillis1 >= interval1) {
    previousMillis1 = currentMillis;
    loopEverySecond();
  }

  if (currentMillis - previousMillis2 >= interval2) {
    previousMillis2 = currentMillis;
    loopEveryTenMinutes();
  }
}

