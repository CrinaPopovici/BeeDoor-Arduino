import React, { useState } from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Badge } from "react-native-elements";

import SettingsScreen from "../SettingsScreen";
import HomeScreen from "./HomeScreen";
import NotificationsScreen from "../NotificationsScreen";
import { Routes } from "../../routing/routes";

const BottomTab = createBottomTabNavigator();

export default function MainContainer() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  
  
  const NotificationIconWithBadge = ({ iconName, badgeCount, color, size }) => {
    return (
      <View style={{ width: 24, height: 24, margin: 5 }}>
        <Ionicons name={iconName} size={size} color={color} />
        {badgeCount > 0 && (
          <Badge
            value={badgeCount}
            status="error"
            containerStyle={{ position: "absolute", top: -4, right: -10 }}
          />
        )}
      </View>
    );
  };

  return (
    <BottomTab.Navigator
      initialRouteName={Routes.Home}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let badgeCount = 0;
          if (route.name === Routes.Home) {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === Routes.Settings) {
            iconName = focused ? "settings" : "settings-outline";
          } else if (route.name === Routes.Notifications) {
            iconName = focused ? "notifications" : "notifications-outline";
            badgeCount = unreadCount;
          }
          return (
            <NotificationIconWithBadge
              iconName={iconName}
              badgeCount={badgeCount}
              color={color}
              size={size}
            />
          );
        },
        tabBarActiveTintColor: "black",
      })}
    >
      <BottomTab.Screen name={Routes.Home}>
        {() => (
          <HomeScreen
            setNotifications={setNotifications}
            setUnreadCount={setUnreadCount}
          />
        )}
      </BottomTab.Screen>

      <BottomTab.Screen name={Routes.Settings} component={SettingsScreen} />

      <BottomTab.Screen name={Routes.Notifications}>
        {() => (
          <NotificationsScreen
            notifications={notifications}
            setUnreadCount={setUnreadCount}
          />
        )}
      </BottomTab.Screen>
    </BottomTab.Navigator>
  );
}

