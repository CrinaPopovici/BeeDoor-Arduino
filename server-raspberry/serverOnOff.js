const express = require('express');
const SerialPort = require('serialport');

// Configurare conexiune serială cu placa Arduino
const arduinoPort = '/dev/ttyUSB0';
const baudRate = 9600;
const arduinoSerial = new SerialPort(arduinoPort, { baudRate });

// Configurare server-raspberry HTTP cu Express.js
const app = express();
const port = 12345; // Portul de comunicare

// Middlewares
app.use(express.json());

// Rute
app.post('/', (req, res) => {
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

app.get("/",(req, res) => {
    res.send('Hello World');
});

// Pornire server-raspberry HTTP
app.listen(port, () => {
    console.log(`Serverul este pornit și ascultă pe portul ${port}`);
});
