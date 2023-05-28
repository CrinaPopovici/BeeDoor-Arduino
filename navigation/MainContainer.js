import * as React from 'react';
import {View, Text} from 'react-native'

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons'

import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import SettingsScreen from "./screens/SettingsScreen";

//Screen names
const homeName="Home";
const detailsName="Details";
const settingsName="Settings";

const Tab=createBottomTabNavigator();
export default function MainContainer({temperature, humidity}){
    return(
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName={homeName}
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
                    return <Ionicons name={iconName} size={size} color={color}/>
                },
            })}
            >
                <Tab.Screen name={homeName}>
                    {() => <HomeScreen temperature={temperature} humidity={humidity} />}
                </Tab.Screen>

              <Tab.Screen name={settingsName} component={SettingsScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}
