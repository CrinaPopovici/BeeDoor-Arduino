import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

import { getData } from "../routing/firebase";

const image = require("../bee.jpg");

export default function HomeScreen({ navigation }) {
  const [indoorTemp, setIndoorTemp] = useState(null);
  const [indoorHumidity, setIndoorHumidity] = useState(null);
  const [outdoorTemp, setOutdoorTemp] = useState(null);
  const [outdoorHumidity, setOutdoorHumidity] = useState(null);

  useEffect(() => {
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

  // console.log(humidity);
  // console.log(temperature);

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