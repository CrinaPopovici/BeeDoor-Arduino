import * as React from 'react';
import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet } from 'react-native';
import { useState } from "react";
const image = require("../bee.jpg");

export default function HomeScreen({ navigation, temperature, humidity }) {
    return (
        <ImageBackground source={image} style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.value}>Humidity: {humidity}</Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.value}>Temperature: {temperature}</Text>
            </View>

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
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
        marginRight: 5,
    },
    value: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 5,
    },
});
