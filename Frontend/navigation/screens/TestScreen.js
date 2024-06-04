import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

export default function App() {
  const [credentials, setCredentials] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [response, setResponse] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (name, value) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setMessage("");
    const serverUrl =
      "https://459a-79-114-82-141.ngrok-free.app/api/auth/login"; // my ngrok url
    console.log("Submitting credentials:", credentials); // Debug log
    try {
      const res = await fetch(serverUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      console.log("Response status:", res.status); // Debug log

      const textResponse = await res.text(); // Get the response as text
      console.log("Response text:", textResponse); // Debug log

      if (!res.ok) {
        console.log("Response error:", textResponse); // Debug log
        throw new Error(`Error: ${res.status} - ${textResponse}`);
      }

      try {
        const resData = JSON.parse(textResponse); // Parse the text response as JSON
        console.log("Response data:", resData); // Debug log
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
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <View style={styles.inputContainer}>
        <Text>Username or Email:</Text>
        <TextInput
          style={styles.input}
          value={credentials.usernameOrEmail}
          onChangeText={(text) => handleChange("usernameOrEmail", text)}
          placeholder="Enter username or email"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Password:</Text>
        <TextInput
          style={styles.input}
          value={credentials.password}
          onChangeText={(text) => handleChange("password", text)}
          placeholder="Enter password"
          secureTextEntry
        />
      </View>
      <Button title="Login" onPress={handleSubmit} />
      {message && <Text style={styles.message}>{message}</Text>}
      {response && (
        <View style={styles.responseContainer}>
          <Text style={styles.responseHeading}>Response:</Text>
          <Text>{JSON.stringify(response, null, 2)}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 12,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 8,
    marginTop: 4,
  },
  message: {
    marginTop: 20,
    textAlign: "center",
    color: "red",
  },
  responseContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  responseHeading: {
    fontWeight: "bold",
  },
});
