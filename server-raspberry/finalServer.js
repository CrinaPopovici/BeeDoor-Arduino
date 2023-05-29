const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const axios = require('axios');

// Configurare conexiune serială cu placa Arduino
const arduinoPort = '/dev/ttyUSB0';
const baudRate = 9600;
const arduinoSerial = new SerialPort(arduinoPort, { baudRate });

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Porturi de comunicare
const port = 3002; // Portul pentru date și comenzi

app.use(express.json());

let currentTemperature = null;
let currentHumidity = null;

app.get('/api/data', (req, res) => {
    res.json({
        temperature: currentTemperature,
        humidity: currentHumidity
    });
});

// Ruta pentru a primi temperatura și umiditatea
app.post('/api/data', (req, res) => {
    const temperature = req.body.temperature;
    const humidity = req.body.humidity;

    console.log('Temperatură:', temperature);
    console.log('Umiditate:', humidity);

    currentTemperature = temperature;
    currentHumidity = humidity;

    // Emit the new data to all connected clients
    io.emit('data', { temperature, humidity });

    res.status(200).json({ message: 'Date primite cu succes!' });
});

// Ruta pentru a primi comenzi
app.post('/api/command', (req, res) => {
    const command = req.body.command;
    console.log('Comandă primită:', command);

    // Trimite comanda către placa Arduino prin portul serial
    arduinoSerial.write(command);

    res.status(200).send('Comandă trimisă cu succes');
});

// Manipulează erorile conexiunii seriale
arduinoSerial.on('error', (err) => {
    console.error('Eroare conexiune serială:', err.message);
});

/*app.get("/",(req, res) => {
  res.send('Hello World');
}); */

server.listen(port, () => {
    console.log(`Serverul API este pornit și ascultă pe portul ${port}`);
});

const parser = arduinoSerial.pipe(new Readline({ delimiter: '\n' }));
const apiEndpoint = 'http://172.20.10.10:3002/api/data';

parser.on('data', line => {
    const [temperature, humidity] = line.trim().split(' ');
    const data = {
        temperature,
        humidity,
    };

    axios.post(apiEndpoint, data)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
});

// Handle errors
arduinoSerial.on('error', error => console.error(error));
