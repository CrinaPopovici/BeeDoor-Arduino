import React from "react";
import { ImageBackground, StyleSheet, View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

const image = require("../bee.jpg");

export default function HomeScreen({ navigation, temperature, humidity }) {
  return (
    <ImageBackground source={image} style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.value}>Humidity: {humidity}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.value}>Temperature: {temperature}</Text>
        </View>
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
