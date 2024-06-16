const char MAIN_page[] PROGMEM = R"=====(
<html>\
  <head>\
    <title>Control ESP8266</title>\
    <script>\
      function sendCommand(command) {\
        var xhr = new XMLHttpRequest();\
        xhr.open('GET', '/' + command, true);\
        xhr.send();\
      }\
    </script>\
  </head>\
  <body>\
    <h1>Control ESP8266</h1>\
    <button onclick=\"sendCommand('openDoor')\">Deschide Usa</button>\
    <button onclick=\"sendCommand('closeDoor')\">Inchide Usa</button>\
    <br><br>\
    <a href=\"/temperature\">Citeste Temperatura</a><br>\
    <a href=\"/humidity\">Citeste Umiditatea</a><br>\
    <a href=\"/temperatureOutside\">Citeste Temperatura Exterioara</a><br>\
    <a href=\"/humidityOutside\">Citeste Umiditatea Exterioara</a><br>\
  </body>\
  </html>
)=====";
