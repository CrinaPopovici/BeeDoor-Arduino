import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './navigation/screens/WelcomeScreen';
import LoginScreen from './navigation/screens/LoginScreen';
import RegisterScreen from './navigation/screens/RegisterScreen';
import PowerScreen from './navigation/screens/PowerScreen';
import MainContainer from './navigation/MainContainer';

const RootStack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <RootStack.Navigator>
                <RootStack.Screen name="Welcome" component={WelcomeScreen} />
                <RootStack.Screen name="Main" component={MainContainer} options={{headerShown:false}}/>
                <RootStack.Screen name="Login" component={LoginScreen} />
                <RootStack.Screen name="SignUp" component={RegisterScreen} />
            </RootStack.Navigator>
        </NavigationContainer>
    );
}
