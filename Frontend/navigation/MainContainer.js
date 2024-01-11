import * as React from 'react';
import {View, Text} from 'react-native'

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons'

import WelcomeScreen from "./screens/WelcomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import {createStackNavigator} from "@react-navigation/stack";
import AuthContext from "./screens/AuthContext";
import {useContext} from "react";
import HomeScreen from "./screens/HomeScreen";

export const welcomeName = "Welcome";
export const homeName = "Home";
const detailsName = "Details";
const settingsName = "Settings";
export const loginName = "Login";
export const registerName = "SignUp";
const Tab = createBottomTabNavigator();

const AuthStack = createStackNavigator();
const AppTab = createBottomTabNavigator();

export default function MainContainer({temperature, humidity}) {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={welcomeName}
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === welcomeName) {
                            iconName = focused ? 'home' : 'home-outline'
                        } else if (rn === detailsName) {
                            iconName = focused ? 'list' : 'list-outline'
                        } else if (rn === settingsName) {
                            iconName = focused ? 'settings' : 'settings-outline'
                        } else if (rn === loginName) {
                            iconName = focused ? 'log-in' : 'log-in-outline';
                        } else if (rn === registerName) {
                            iconName = focused ? 'person-add' : 'person-add-outline';
                        }
                        return <Ionicons name={iconName} size={size} color={color}/>
                    },
                    tabBarActiveTintColor: 'black',
                })}
            >
                <Tab.Screen name={welcomeName}>
                    {() => <WelcomeScreen temperature={temperature} humidity={humidity}/>}
                </Tab.Screen>
                <Tab.Screen name={homeName}>
                    {() => <HomeScreen temperature={temperature} humidity={humidity}/>}
                </Tab.Screen>

                <Tab.Screen name={settingsName} component={SettingsScreen}/>
                <Tab.Screen name={loginName} component={LoginScreen}/>
                <Tab.Screen name={registerName} component={RegisterScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}

