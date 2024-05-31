import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import axios from "axios";

// const SERVER_IP = '172.20.10.10'; // Adresa IP a Raspberry Pi care rulează serverul
// const SERVER_PORT = 3002; // Portul serverului

// const sendCommand = (command) => {
//     NetInfo.fetch().then((state) => {
//         if (state.isConnected) {
//             axios.post(`http://${SERVER_IP}:${SERVER_PORT}/api/command`, {command})
//                 .then(() => {
//                     console.log('Comandă trimisă cu succes');
//                 })
//                 .catch((error) => {
//                     console.log('Eroare la trimiterea comenzii:', error.message);
//                 });
//         } else {
//             console.log('Dispozitivul nu este conectat la rețea');
//         }
//     });
// };

const ESP8266_IP = "http://192.168.3.218";

export const turnOn = async () => {
  try {
    await fetch(`${ESP8266_IP}/openDoor`);
  } catch (error) {
    Alert.alert("Eroare la aprinderea becului");
  }
};

export const turnOff = async () => {
  try {
    await fetch(`${ESP8266_IP}/closeDoor`);
  } catch (error) {
    Alert.alert("Eroare la stingerea becului");
  }
};

const PowerScreen = () => {
  const [motorOnSalcam, setMotorOnSalcam] = useState(false);
  const [motorOnFloareaSoarelui, setMotorOnFloareaSoarelui] = useState(false);

  // const handleMotorSalcamToggle = () => {
  //     const command = motorOnSalcam ? 'STOPSALCAM' : 'STARTSALCAM';
  //     console.log(`Stare curentă a motorului: ${motorOnSalcam}`);
  //     console.log(`Comandă trimisă: ${command}`);
  //     sendCommand(command);
  //     setMotorOnSalcam(!motorOnSalcam);
  // };
  // const handleMotorFloareaSoareluiToggle = () => {
  //     const command = motorOnSalcam ? 'STOPFLOAREASOARELUI' : 'STARTFLOAREASOARELUI';
  //     console.log(`Stare curentă a motorului: ${motorOnFloareaSoarelui}`);
  //     console.log(`Comandă trimisă: ${command}`);
  //     sendCommand(command);
  //     setMotorOnFloareaSoarelui(!motorOnFloareaSoarelui);
  // };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={turnOn}>
        <Text style={styles.text}>
          {motorOnSalcam ? "Pornire culegere" : "Pornire culegere"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button2} onPress={turnOff}>
        <Text style={styles.text}>
          {motorOnFloareaSoarelui ? "Oprire culegere" : "Oprire culegere"}
        </Text>
      </TouchableOpacity>
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

  text: {
    color: "white",
    fontSize: 18,
  },
});

export default PowerScreen;
