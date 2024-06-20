import React, { useState } from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Badge } from "react-native-elements";

import SettingsScreen from "./screens/SettingsScreen";
import HomeScreen from "./screens/HomeScreen";
import NotificationsScreen from "./screens/NotificationsScreen";

export const homeTabName = "Home";
const settingsName = "Settings";
const notificationsName = "Notifications";

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
      initialRouteName={homeTabName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let badgeCount = 0;
          if (route.name === homeTabName) {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === settingsName) {
            iconName = focused ? "settings" : "settings-outline";
          } else if (route.name === notificationsName) {
            iconName = focused ? "notifications" : "notifications-outline";
            // badgeCount = notifications.length;
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
      <BottomTab.Screen name={homeTabName}>
        {() => (
          <HomeScreen
            setNotifications={setNotifications}
            setUnreadCount={setUnreadCount}
          />
        )}
      </BottomTab.Screen>

      <BottomTab.Screen name={settingsName} component={SettingsScreen} />

      <BottomTab.Screen name={notificationsName}>
        {() => (
          <NotificationsScreen
            notifications={notifications}
            clearUnreadCount={() => setUnreadCount(0)}
          />
        )}
      </BottomTab.Screen>
    </BottomTab.Navigator>
  );
}