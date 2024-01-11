import React from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import SettingsScreen from './SettingsScreen';
import Ionicons from "react-native-vector-icons/Ionicons";
import {ImageBackground, StyleSheet, View, Text} from 'react-native';
import {StatusBar} from "expo-status-bar";

const Tab = createBottomTabNavigator();
const image = require('../bee.jpg');

export default function HomeScreen({navigation, temperature, humidity}) {
    return (
        <ImageBackground source={image} style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.value}>Humidity: {humidity}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.value}>Temperature: {temperature}</Text>
                </View>
            </View>
            <Tab.Navigator
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;
                        if (route.name === 'Settings') {
                            iconName = focused ? 'settings' : 'settings-outline';
                        } else if (route.name === 'UserInfo') {
                            iconName = focused ? 'person' : 'person-outline';
                        }
                        return <Ionicons name={iconName} size={size} color={color}/>;
                    },
                    tabBarActiveTintColor: 'black',
                    tabBarInactiveTintColor: 'gray',
                    tabBarStyle: {backgroundColor: 'white'},
                })}
            >
                <Tab.Screen name="Settings" component={SettingsScreen}/>
            </Tab.Navigator>

            <StatusBar style="auto"/>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentContainer: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 300,
    },
    textContainer: {
        flexDirection: 'column',
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
        marginTop: 10,
        marginBottom: 10,
    },
});
