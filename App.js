import { StatusBar } from 'expo-status-bar';
import MainContainer from "./navigation/MainContainer";

// function App(){
//     return(
//         <MainContainer/>
//     )
// }
export default App;

import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import DataDisplay from './DataDisplay';

const App = () => {
    const [temperature, setTemperature] = useState(null);
    const [humidity, setHumidity] = useState(null);

    useEffect(() => {
        fetch('http://192.168.100.42/get_data')
            .then(response => response.json())
            .then(data => {
                setTemperature(data.temperature);
                setHumidity(data.humidity);
            });
    }, []);

    return (
        <View>
            {temperature && humidity && <DataDisplay temperature={temperature} humidity={humidity} />}
        </View>
    );
};

export default App;
