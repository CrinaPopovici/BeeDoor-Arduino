import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./navigation/screens/WelcomeScreen";
import LoginScreen from "./navigation/screens/LoginScreen";
import RegisterScreen from "./navigation/screens/RegisterScreen";
import MainContainer from "./navigation/screens/BottomNavWithHomeScreen/MainContainer";
import { Routes } from "./navigation/routing/routes";

const RootStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="Welcome" component={WelcomeScreen} />
        <RootStack.Screen
          name={Routes.MainContainer}
          component={MainContainer}
          options={{ headerShown: false }}
        />
        <RootStack.Screen name="Login" component={LoginScreen} />
        <RootStack.Screen name="SignUp" component={RegisterScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

