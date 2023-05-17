import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import MainContainer from "./navigation/MainContainer";
import io from 'socket.io-client';

const App = () => {
    const [temperature, setTemperature] = useState(null);
    const [humidity, setHumidity] = useState(null);

    useEffect(() => {
        const socket = io('http://192.168.3.67:3002');

        socket.on('data', (data) => {
            setTemperature(data.temperature);
            setHumidity(data.humidity);
        });

        return () => socket.disconnect();
    }, []);

    return (
        <MainContainer
            temperature = {temperature}
            humidity = {humidity}/>
    );
};

export default App;
