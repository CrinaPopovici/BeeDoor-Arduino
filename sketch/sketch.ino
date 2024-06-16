
#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>
#include <ESP8266WebServer.h>
#include <SimpleDHT.h>
#include <Servo.h>
#include "FirebaseConfiguration.h"
#include "PageIndex.h"

#define REED_PIN D1 
#define REED_PIN2 D2 

const int dht_pin = D7;
const int dht_pin_outside = D8;

SimpleDHT11 dht11;
SimpleDHT11 dht11Outside;

Servo door;

const char* ssid = "Seco";
const char* password = "secosanpq1";

FirebaseData firebaseData;
FirebaseConfig firebaseConfig;
FirebaseAuth firebaseAuth;

ESP8266WebServer server(80);

unsigned long previousMillis = 0;
const long interval = 2000;

void handleRoot() {
   String html = MAIN_page;
   server.send(200, "text/html", html);
}
//Inside Temperature
void handleTemperature() {
  byte temperature = 0;
  byte humidity = 0;
  int err = dht11.read(dht_pin, &temperature, &humidity, NULL);
  if (err != SimpleDHTErrSuccess) {
    server.send(500, "text/plain", "Error reading temperature.");
    return;
  }
  server.send(200, "text/plain", String(temperature));
}

void handleHumidity() {
  byte temperature = 0;
  byte humidity = 0;
  int err = dht11.read(dht_pin, &temperature, &humidity, NULL);
  if (err != SimpleDHTErrSuccess) {
    server.send(500, "text/plain", "Error reading humidity.");
    return;
  }
  server.send(200, "text/plain", String(humidity));
}

void handleTemperatureOutside() {
  byte temperatureOutside = 0;
  byte humidityOutside = 0;
  int err = dht11Outside.read(dht_pin_outside, &temperatureOutside, &humidityOutside, NULL);
  if (err != SimpleDHTErrSuccess) {
    server.send(500, "text/plain", "Error reading outside temperature.");
    return;
  }
  server.send(200, "text/plain", String(temperatureOutside));
}

void handleHumidityOutside() {
  byte temperatureOutside = 0;
  byte humidityOutside = 0;
  int err = dht11Outside.read(dht_pin_outside, &temperatureOutside, &humidityOutside, NULL);
  if (err != SimpleDHTErrSuccess) {
    server.send(500, "text/plain", "Error reading outside humidity.");
    return;
  }
  server.send(200, "text/plain", String(humidityOutside));
}

void openDoor() {
  door.attach(D0, 500, 2400); 
  int pos = 90;
  door.write(pos);
  delay(15);
  door.detach();
  server.send(200, "text/plain", "Door Opened");
}

void closeDoor() {
  door.attach(D0, 500, 2400); 
  int pos = 180;
  door.write(pos);
  delay(15);
  door.detach();
  server.send(200, "text/plain", "Door Closed");
}

void setup() {
  Serial.begin(115200);
  delay(500);

  pinMode(REED_PIN, INPUT_PULLUP); 
  pinMode(REED_PIN2, INPUT_PULLUP);

  door.attach(D0, 500, 2400);
  door.write(180); 

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  // Configurația Firebase
  firebaseConfig.host = FIREBASE_HOST;
  firebaseConfig.signer.tokens.legacy_token = FIREBASE_AUTH;

  // Conectare la Firebase
  Firebase.begin(&firebaseConfig, &firebaseAuth);
  Firebase.reconnectWiFi(true);
  Serial.println("Connected to Firebase");

  server.on("/", handleRoot);
  server.on("/temperature", handleTemperature);
  server.on("/temperatureOutside", handleTemperatureOutside);
  server.on("/humidity", handleHumidity);
  server.on("/humidityOutside", handleHumidityOutside);
  server.on("/openDoor", openDoor);
  server.on("/closeDoor", closeDoor);

  server.begin();
  Serial.println("HTTP server started");
}

void loop() {
  server.handleClient();
  
  unsigned long currentMillis = millis();
  
  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;

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

    Serial.print("Temperature: ");
    Serial.print(temperature);
    Serial.println(" *C");
    Serial.print("Humidity: ");
    Serial.print(humidity);
    Serial.println(" %");
    Serial.print("Temperature outside: ");
    Serial.print(temperatureOutside);
    Serial.println(" *C");
    Serial.print("Humidity outside: ");
    Serial.print(humidityOutside);
    Serial.println(" %");
  

    if (Firebase.setFloat(firebaseData, "/indoor/temperature", temperature)) {
      Serial.println("Temperature data sent to Firebase");
    } else {
      Serial.println("Failed to send temperature data to Firebase");
      Serial.println(firebaseData.errorReason());
    }

    if (Firebase.setFloat(firebaseData, "/indoor/humidity", humidity)) {
      Serial.println("Humidity data sent to Firebase");
    } else {
      Serial.println("Failed to send humidity data to Firebase");
      Serial.println(firebaseData.errorReason());
    }

    if (Firebase.setFloat(firebaseData, "/outdoor/temperature", temperatureOutside)) {
      Serial.println("Outdoor temperature data sent to Firebase");
    } else {
      Serial.println("Failed to send outdoor temperature data to Firebase");
      Serial.println(firebaseData.errorReason());
    }

    if (Firebase.setFloat(firebaseData, "/outdoor/humidity", humidityOutside)) {
      Serial.println("Outdoor humidity data sent to Firebase");
    } else {
      Serial.println("Failed to send outdoor humidity data to Firebase");
      Serial.println(firebaseData.errorReason());
    }
  }

  int reedState = digitalRead(REED_PIN); 
  if (reedState != HIGH) {
    Serial.println("Usa inchisa");
    if (!Firebase.setString(firebaseData, "/doorStatus", "closed")) {
      Serial.println("Failed to send door status to Firebase");
      Serial.println(firebaseData.errorReason());
    }
  }

  int reedState2 = digitalRead(REED_PIN2); 
  if (reedState2 == LOW) {
    Serial.println("Usa deschisa");
    if (!Firebase.setString(firebaseData, "/doorStatus", "opened")) {
      Serial.println("Failed to send door status to Firebase");
      Serial.println(firebaseData.errorReason());
    }
  }

  // Gestionare Firebase
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

  delay(1000); 
}
