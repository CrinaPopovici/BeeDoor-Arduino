import * as React from 'react';
import {View, Text} from 'react-native'

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons'

import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
//import LoginScreen from "./screens/LoginScreen";

//Screen names
const homeName="Home";
const detailsName="Details";
const settingsName="Settings";
export const loginName = "Login";
export const registerName = "Register";


const Tab=createBottomTabNavigator();
export default function MainContainer({temperature, humidity}){
    return(
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={loginName} //sau homeName sau loginName sau registerName
                screenOptions={({route})=>({
                    tabBarIcon: ({focused, color, size})=>{
                        let iconName;
                        let rn=route.name;

                        if(rn === homeName){
                            iconName = focused ? 'home' : 'home-outline'
                        } else if(rn === detailsName){
                            iconName = focused ? 'list' : 'list-outline'
                        } else if(rn === settingsName){
                            iconName = focused ? 'settings' : 'settings-outline'
                        }
                        else if(rn === registerName){
                            iconName = focused ? 'register' : 'register-outline'
                        } else if(rn === loginName){
                            iconName = focused ? 'login' : 'login-outline'
                        }
                        return <Ionicons name={iconName} size={size} color={color}/>
                    },
                    tabBarActiveTintColor: 'black', // aici setezi culoarea dorită
                })}
            >
                <Tab.Screen name={loginName} component={LoginScreen}/>
                <Tab.Screen name={registerName} component={RegisterScreen}/>

                <Tab.Screen name={homeName}>
                    {() => <HomeScreen temperature={temperature} humidity={humidity} />}
                </Tab.Screen>

                <Tab.Screen name={settingsName} component={SettingsScreen}/>
            </Tab.Navigator>


        </NavigationContainer>
    );
}
