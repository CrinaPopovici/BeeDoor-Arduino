import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { getData } from "../routing/firebase";

const image = require("../bee.jpg");

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function HomeScreen({
  navigation,
  setNotifications,
  setUnreadCount,
}) {
  const [indoorTemp, setIndoorTemp] = useState(null);
  const [indoorHumidity, setIndoorHumidity] = useState(null);
  const [outdoorTemp, setOutdoorTemp] = useState(null);
  const [outdoorHumidity, setOutdoorHumidity] = useState(null);

  useEffect(() => {
    registerForPushNotificationsAsync();

    getData("/indoor/temperature", (data) => {
      console.log("Indoor Temperature: ", data);
      setIndoorTemp(data);
    });
    getData("/indoor/humidity", (data) => {
      console.log("Indoor Humidity: ", data);
      setIndoorHumidity(data);
    });
    getData("/outdoor/temperature", (data) => {
      console.log("Outdoor Temperature: ", data);
      setOutdoorTemp(data);
    });
    getData("/outdoor/humidity", (data) => {
      console.log("Outdoor Humidity: ", data);
      setOutdoorHumidity(data);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (indoorHumidity > 50) {
        const notificationMessage =
          "Indoor Humidity is more than 70, ventilate the hive";
        sendPushNotification(notificationMessage);
        const now = new Date();
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          { message: notificationMessage, time: now.toLocaleString() },
        ]);
        setUnreadCount((prevCount) => prevCount + 1);
      }

      if (indoorHumidity < 30) {
        const notificationMessage = "Indoor Humidity is lower than 30";
        sendPushNotification(notificationMessage);
        const now = new Date();
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          { message: notificationMessage, time: now.toLocaleString() },
        ]);
        setUnreadCount((prevCount) => prevCount + 1);
      }
    }, 20 * 1000);
    return () => clearInterval(interval);
  }, [indoorHumidity]);

  return (
    <ImageBackground source={image} style={styles.container}>
      <View style={styles.contentContainer}>
        <Text>
          Indoor Temperature: {indoorTemp !== null ? indoorTemp : "Loading..."}{" "}
          °C
        </Text>
        <Text>
          Indoor Humidity:{" "}
          {indoorHumidity !== null ? indoorHumidity : "Loading..."} %
        </Text>
        <Text>
          Outdoor Temperature:{" "}
          {outdoorTemp !== null ? outdoorTemp : "Loading..."} °C
        </Text>
        <Text>
          Outdoor Humidity:{" "}
          {outdoorHumidity !== null ? outdoorHumidity : "Loading..."} %
        </Text>
      </View>
      <StatusBar style="auto" />
    </ImageBackground>
  );
}

async function sendPushNotification(message) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Alert",
      body: message,
    },
    trigger: { seconds: 1 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    console.log(
      "Running on an emulator, push notifications are not supported."
    );
    return;
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    marginRight: 5,
  },
  value: {
    borderWidth: 1,
    borderColor: "black",
    padding: 5,
    marginTop: 10,
    marginBottom: 10,
  },
});
