import * as React from "react";
import { View, Text } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import SettingsScreen from "./screens/SettingsScreen";
import HomeScreen from "./screens/HomeScreen";

export const welcomeName = "Welcome";
export const homeTabName = "Home";
const detailsName = "Details";
const settingsName = "Settings";

const BottomTab = createBottomTabNavigator();

export default function MainContainer({ temperature, humidity }) {
    return (
        <BottomTab.Navigator
            initialRouteName={welcomeName}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === homeTabName) {
                        iconName = focused ? "home" : "home-outline";
                    } else if (rn === detailsName) {
                        iconName = focused ? "list" : "list-outline";
                    } else if (rn === settingsName) {
                        iconName = focused ? "settings" : "settings-outline";
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "black",
            })}
        >
            <BottomTab.Screen name={homeTabName}>
                {() => <HomeScreen temperature={temperature} humidity={humidity} />}
            </BottomTab.Screen>
            <BottomTab.Screen name={settingsName} component={SettingsScreen} />
        </BottomTab.Navigator>
    );
}
