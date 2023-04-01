import * as React from 'react';
import {View, Text} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {ImageBackground, StyleSheet} from 'react-native';
const image = require("../bee.jpg");

export default function HomeScreen({navigation}){
    return(
        <ImageBackground source={image} style={styles.container}>
            <Text>Humidity: </Text>
            <Text>Temperature: </Text>

            <StatusBar style="auto" />
        </ImageBackground>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

});
