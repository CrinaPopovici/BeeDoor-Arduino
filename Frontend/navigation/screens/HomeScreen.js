import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button } from "react-native-paper";

const image = require("../bee.jpg");

export default function HomeScreen({ navigation }) {
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tempResponse = await fetch("http://192.168.3.218/temperature");
        const tempData = await tempResponse.text();
        setTemperature(tempData);
      } catch (error) {
        console.error(error);
      }
    };

   fetchData();
    const interval = setInterval(fetchData, 5000); // Fetch data every 2 seconds
    return () => clearInterval(interval, interval1);
  }, []);

  useEffect(()=>{
    //Humidity
    const fetchHumidity = async () => {
      try {
        const humResponse = await fetch("http://192.168.3.218/humidity");
        const humData = await humResponse.text();
        setHumidity(humData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchHumidity();
    const interval = setInterval(fetchHumidity, 10000); // Fetch data every 2 seconds
    return () => clearInterval(interval, interval1);
  },[])
  console.log(humidity);
  console.log(temperature);
  return (
    <ImageBackground source={image} style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.label}>
            Humidity: {humidity ? `${humidity} %` : "Loading..."}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.label}>
            Temperature: {temperature ? `${temperature} °C` : "Loading..."}
          </Text>
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
