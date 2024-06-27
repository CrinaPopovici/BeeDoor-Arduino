import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { Ionicons } from "react-native-vector-icons";
import { Routes } from "../routing/routes";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import NgrokId from "../Components/NgrokId";

const RegisterScreen = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const navigation = useNavigation();
  const [gender, setGender] = useState("");

  const [credentials, setCredentials] = useState({
    fullName: "",
    username: "",
    role: "",
    gender: "",
    email: "",
    phoneNumber: "",
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
    const url = `https://${NgrokId.id}.ngrok-free.app/api/auth/register`;

    console.log("Submitting credentials:", credentials);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      console.log("Response status:", res.status);

      const textResponse = await res.text();
      console.log("Response text:", textResponse);

      const resData = JSON.parse(textResponse);

      if (
        !res.ok ||
        (resData.errors &&
          (Array.isArray(resData.errors) ||
            Object.keys(resData.errors).length > 0))
      ) {
        const errorMessages = Array.isArray(resData.errors)
          ? resData.errors.join("\n")
          : Object.entries(resData.errors)
              .map(([field, messages]) => messages.join("\n"))
              .join("\n");
        throw new Error(errorMessages);
      }

      console.log("Response data:", resData);
      setResponse(resData);
      setMessage("Registered successfully!");
      Alert.alert("Success", "Register successful!");
    } catch (error) {
      setMessage(`Register failed. Please try again. ${error.message}`);
      Alert.alert("Register failed", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainButtonsContainer}>
        <Text style={styles.text2}>Sign up </Text>
        <TextInput
          mode="outlined"
          style={styles.input}
          placeholder="Full Name"
          value={credentials.fullName}
          onChangeText={(text) => handleChange("fullName", text)}
          placeholderTextColor="#666B78"
          outlineStyle={styles.inputField}
        />
        <TextInput
          mode="outlined"
          style={styles.input}
          placeholder="Username"
          value={credentials.username}
          onChangeText={(text) => handleChange("username", text)}
          placeholderTextColor="#666B78"
          outlineStyle={styles.inputField}
        />
        <TextInput
          mode="outlined"
          style={styles.input}
          placeholder="Role"
          value={credentials.role}
          onChangeText={(text) => handleChange("role", text)}
          placeholderTextColor="#666B78"
          outlineStyle={styles.inputField}
        />
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={gender}
            style={styles.picker}
            onValueChange={(itemValue) => {
              setGender(itemValue);
              handleChange("gender", itemValue);
            }}
          >
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
        </View>
        <TextInput
          mode="outlined"
          style={styles.input}
          placeholder="Email [required]"
          value={credentials.email}
          onChangeText={(text) => handleChange("email", text)}
          placeholderTextColor="#666B78"
          outlineStyle={styles.inputField}
        />
        <TextInput
          mode="outlined"
          style={styles.input}
          placeholder="Phone Number"
          value={credentials.phoneNumber}
          onChangeText={(text) => handleChange("phoneNumber", text)}
          placeholderTextColor="#666B78"
          outlineStyle={styles.inputField}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password [required]"
            value={credentials.password}
            onChangeText={(text) => handleChange("password", text)}
            placeholderTextColor="#666B78"
            mode="outlined"
            outlineStyle={styles.inputField}
            secureTextEntry={hidePassword}
          />
          <TouchableOpacity
            onPress={() => setHidePassword(!hidePassword)}
            style={styles.iconContainer}
          >
            <Ionicons
              name={hidePassword ? "eye-off" : "eye"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        <Button mode="contained" style={styles.button} onPress={handleSubmit}>
          Register
        </Button>
      </View>
      <Button
        mode="text"
        style={styles.signInText}
        onPress={() => {
          navigation.navigate(Routes.Login);
        }}
      >
        Got an account? Sign in!
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputField: {
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
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
    height: "70%",
    width: "100%",
  },
  input: {
    width: "90%",
    marginVertical: 10,
    color: "#666B78",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
  },
  passwordInput: {
    flex: 1,
  },
  iconContainer: {
    padding: 10,
  },
  logo: {
    fontSize: 30,
    marginBottom: 20,
  },
  text2: {
    fontSize: 30,
    marginBottom: 8,
    marginTop: 122,
    color: "#000618",
    marginLeft: 24,
    marginRight: 24,
    textAlign: "center",
  },
  button: {
    marginTop: 15,
    marginBottom: 55,
    width: "87.2%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#ffd407",
  },
  signInText: {
    marginTop: 15,
    marginBottom: 55,
    width: "87.2%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    color: "#ffd407",
  },
  pickerContainer: {
    width: "90%",
    marginVertical: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#666B78",
  },
  picker: {
    height: 50,
    width: "100%",
    color: "#666B78",
  },
});

export default RegisterScreen;
