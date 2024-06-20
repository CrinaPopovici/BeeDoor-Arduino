import * as React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet } from "react-native";
import { Routes } from "../routing/routes";

const image = require("../bee.jpg");

export default function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.buttonsContainer}>
          <Button
            mode="contained"
            style={styles.button}
            labelStyle={styles.buttonText}
            onPress={() => navigation.navigate(Routes.Login)}
          >
            Login
          </Button>
          <Button
            mode="contained"
            style={{ backgroundColor: "#ffd407" }}
            labelStyle={{ color: "white" }}
            onPress={() => navigation.navigate(Routes.SignUp)}
          >
            SignUp
          </Button>
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
    flex: 1,
    justifyContent: "space-around",
    width: "100%",
    alignItems: "center",
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  value: {
    borderWidth: 1,
    borderColor: "black",
    padding: 5,
    textAlign: "center",
  },
  buttonsContainer: {
    width: "80%",
  },
  button: {
    backgroundColor: "#ffd407",
    marginBottom: 3,
  },
  buttonText: {
    color: "white",
  },
});
