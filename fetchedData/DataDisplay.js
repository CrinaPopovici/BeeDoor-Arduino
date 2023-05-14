import React from 'react';
import { View, Text } from 'react-native';

const DataDisplay = ({ temperature, humidity }) => {
    return (
        <View>
            <Text>Temperature: {temperature} °C</Text>
            <Text>Humidity: {humidity} %</Text>
        </View>
    );
};

export default DataDisplay;
