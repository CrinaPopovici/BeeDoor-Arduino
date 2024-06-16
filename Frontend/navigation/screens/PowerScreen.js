import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { getData, sendCommand } from "../routing/firebase";

const PowerScreen = () => {
  const [statusDoor, setStatusDoor] = useState(null);

  useEffect(() => {
    getData("/doorStatus", (data) => {
      console.log("Status Door: ", data);
      setStatusDoor(data);
    });
  }, []);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => sendCommand("open")}
      >
        <Text style={styles.text}>Open the Door</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button2}
        onPress={() => sendCommand("close")}
      >
        <Text style={styles.text}>Close the Door</Text>
      </TouchableOpacity>
      <View style={styles.contentText}>
        <Text>
          Status Door: {statusDoor !== null ? statusDoor : "Loading..."}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: Dimensions.get("window").height * 0.4, // 40% din inaltimea ecranului
  },
  button: {
    width: "100%",
    height: 60, // înălțime fixă
    backgroundColor: "#010013",
    justifyContent: "center",
    alignItems: "center",
    //borderRadius: 5,
  },
  button2: {
    width: "100%",
    height: 60, // înălțime fixă
    backgroundColor: "#e3e200",
    justifyContent: "center",
    alignItems: "center",
    //borderRadius: 5,
  },
  contentText: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 18,
  },
});

export default PowerScreen;