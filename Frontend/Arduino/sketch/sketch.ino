#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <SimpleDHT.h>
#include <Servo.h>

const int dht_pin = D7; 
SimpleDHT11 dht11;
Servo door;

const char* ssid = "Seco";
const char* password = "secosanpq1";

ESP8266WebServer server(80);

unsigned long previousMillis = 0; 
const long interval = 2000; 

void handleRoot() {
  String html = "<h1>ESP8266 Web Server</h1><p>Use /temperature for temperature and /humidity for humidity.</p>";
  server.send(200, "text/html", html);
}

void handleTemperature() {
  byte temperature = 0;
  byte humidity = 0;
  int err = dht11.read(dht_pin, &temperature, &humidity, NULL);
  if (err != SimpleDHTErrSuccess) {
    server.send(500, "text/plain", "Loading...");
    return;
  }
  server.send(200, "text/plain", String(temperature));
}

void handleHumidity() {
  byte temperature = 0;
  byte humidity = 0;
  int err = dht11.read(dht_pin, &temperature, &humidity, NULL);
  if (err != SimpleDHTErrSuccess) {
    server.send(500, "text/plain", "Loading...");
    return;
  }
  server.send(200, "text/plain", String(humidity));
}

void openDoor() {
    door.attach(D0, 500, 2400); // Atașează servomotorul
    int pos = 90;
    door.write(pos);
    delay(15);
    door.detach();
    Serial.print("Servo Angle: ");
    Serial.println(pos);
    server.send(200, "text/plain", "");
}

void closeDoor() {
    door.attach(D0, 500, 2400); // Atașează servomotorul
    int pos = 180;
    door.write(pos);
    delay(15);
    door.detach();
    Serial.print("Servo Angle: ");
    Serial.println(pos);
    
 
    server.send(200, "text/plain", "");
  
}

void setup() {
  Serial.begin(115200);
  delay(500);

    door.attach(D0, 500, 2400);   ////la esp8266 e problema si daca scrii normal adica doar D1, motorul merge maxim 90 de grade
    door.write(180); // Setează poziția inițială a servomotorului la 180 de grade (0 grade la mine ca e motorul pus invers)
//    door.detach();

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

  server.on("/", handleRoot);
  server.on("/temperature", handleTemperature);
  server.on("/humidity", handleHumidity);
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

    Serial.print("Temperature: ");
    Serial.print(temperature);
    Serial.println(" *C");
    Serial.print("Humidity: ");
    Serial.print(humidity);
    Serial.println(" H");
    Serial.println();
  }
}

