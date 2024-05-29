#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <SimpleDHT.h>

const int dht_pin = D7; 
SimpleDHT11 dht11;

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

void setup() {
  Serial.begin(115200);
  delay(500);

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
