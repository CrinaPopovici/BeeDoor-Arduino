const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const axios = require('axios');
const serialPort = new SerialPort('/dev/ttyUSB0', { baudRate: 9600 });

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 3002;

app.use(express.json());

let currentTemperature = null;
let currentHumidity = null;

app.get('/api/data', (req, res) => {
    res.json({
        temperature: currentTemperature,
        humidity: currentHumidity
    });
    console.log(res.json());
});

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

server.listen(port, () => {
    console.log(`Server API pornit pe portul ${port}`);
});

const parser = serialPort.pipe(new Readline({ delimiter: '\n' }));
const apiEndpoint = 'http://192.168.1.168:3002/api/data';

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
serialPort.on('error', error => console.error(error));
