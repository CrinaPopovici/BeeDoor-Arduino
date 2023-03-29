import { StatusBar } from 'expo-status-bar';
import {ImageBackground, Button, StyleSheet, Text, View, ImageBackgroundComponent} from 'react-native';

const image = require("./bee.jpg");

export default function App() {

  return (
    <ImageBackground source={image} style={styles.container}>
      <Text>Welcome to our app!</Text>
      <Button title="ON" color={'#808000'}></Button>
      <Button title="OFF" color={'#808000'}></Button>
      <Text>Hello!</Text>

        <StatusBar style="auto" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      },
    alignItems: 'center',
    justifyContent: 'center',
  },
    headerImage: {
        width: 415,
        height: 940,
    }
});
