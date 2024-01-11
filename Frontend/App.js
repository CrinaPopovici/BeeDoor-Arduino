import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import WelcomeScreen from './navigation/screens/WelcomeScreen';
import HomeScreen from './navigation/screens/HomeScreen';
import LoginScreen from "./navigation/screens/LoginScreen";
import RegisterScreen from "./navigation/screens/RegisterScreen";
import PowerScreen from "./navigation/screens/PowerScreen";
import SettingsScreen from "./navigation/screens/SettingsScreen";

const RootStack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <RootStack.Navigator>
                <RootStack.Screen name="Welcome" component={WelcomeScreen}/>
                <RootStack.Screen name="Home" component={HomeScreen}/>
                <RootStack.Screen name="Login" component={LoginScreen}/>
                <RootStack.Screen name="SignUp" component={RegisterScreen}/>
                <RootStack.Screen name="Settings" component={SettingsScreen}/>
                <RootStack.Screen name="Power" component={PowerScreen}/>

            </RootStack.Navigator>
        </NavigationContainer>
    );
}
