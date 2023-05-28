import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';

const SERVER_IP = '192.168.1.106'; // Adresa IP a Raspberry Pi care rulează serverul
const SERVER_PORT = 12345; // Portul serverului

const sendCommand = (command) => {
    NetInfo.fetch().then((state) => {
        if (state.isConnected) {
            axios.post(`http://${SERVER_IP}:${SERVER_PORT}`, { command })
                .then(() => {
                    console.log('Comandă trimisă cu succes');
                })
                .catch((error) => {
                    console.log('Eroare la trimiterea comenzii:', error.message);
                });
        } else {
            console.log('Dispozitivul nu este conectat la rețea');
        }
    });
};

const PowerScreen = () => {
    const [motorOn, setMotorOn] = useState(false);

    const handleMotorToggle = () => {
        const command = motorOn ? 'STOP' : 'START';
        console.log(`Stare curentă a motorului: ${motorOn}`);
        console.log(`Comandă trimisă: ${command}`);
        sendCommand(command);
        setMotorOn(!motorOn);
    };

    return (
        <View style={styles.container}>
            <Button
                title={motorOn ? 'Oprire motor' : 'Pornire motor'}
                onPress={handleMotorToggle}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default PowerScreen;
