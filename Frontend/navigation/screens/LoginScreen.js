import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
  Alert,
} from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { Routes } from "./routes";

const LoginScreen = () => {
  const navigation = useNavigation();

  const [credentials, setCredentials] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [response, setResponse] = useState(null);
  const [message, setMessage] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const handleChange = (name, value) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setMessage("");
    const url = "https://459a-79-114-82-141.ngrok-free.app/api/auth/login";

    console.log("Submitting credentials:", credentials);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      console.log("Response status:", res.status); //DEBUG log

      const textResponse = await res.text(); // DEBUG Get the response as text
      console.log("Response text:", textResponse); // DEBUG log

      if (!res.ok) {
        console.log("Response error:", textResponse); // DEBUG log
        throw new Error(`Error: ${res.status} - ${textResponse}`);
      }

      try {
        const resData = JSON.parse(textResponse); // Parse the text response as JSON
        console.log("Response data:", resData); // DEBUG log
        setResponse(resData);
        setMessage("Login successful!");
        Alert.alert("Success", "Login successful!");
      } catch (jsonError) {
        console.error("Error parsing JSON response:", jsonError);
        throw new Error("Failed to parse JSON response");
      }
    } catch (error) {
      console.error("Error making POST request:", error);
      setMessage(`Login failed. Please try again. ${error.message}`);
      Alert.alert("Error", `Login failed. Please try again. ${error.message}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainButtonsContainer}>
        <Text style={styles.logo}>Log in</Text>
        <TextInput
          mode="outlined"
          inputMode="usernameOrEmail"
          style={styles.input}
          placeholder="Type username or email"
          value={credentials.usernameOrEmail}
          onChangeText={(text) => handleChange("usernameOrEmail", text)}
          outlineStyle={styles.inputField}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          mode="outlined"
          outlineStyle={styles.inputField}
          secureTextEntry={hidePassword}
          value={credentials.password}
          onChangeText={(text) => handleChange("password", text)}
          right={
            <TextInput.Icon
              icon="eye"
              onPress={() => setHidePassword(!hidePassword)}
            />
          }
        />
        <Button mode="contained" style={styles.button} onPress={handleSubmit}>
          Login
        </Button>
        <Text style={styles.registerText}>Don't have an account? {"\n"}</Text>
        <Text
          style={styles.registerText}
          //onPress={() => navigation.navigate(Routes.SignUp)}
          onPress={() => {
            navigation.navigate(Routes.SignUp);
          }}
        >
          Register now!
        </Text>
      </View>
      <Button mode="text" style={styles.button}>
        Forgot password?
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {},
  inputField: {
    borderRadius: 5,
    borderWidth: 0,
  },
  mainButtonsContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flexGrow: 1,
  },
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    height: Dimensions.get("window").height,
    width: "100%",
  },
  input: {
    width: "90%",
    marginVertical: 10,
  },
  logo: {
    fontSize: 30,
    marginBottom: 20,
  },
  button: {
    marginVertical: 20,
    width: "90%",
    backgroundColor: "#ffd407",
  },
  registerText: {
    textAlign: "center",
  },
});

export default LoginScreen;
