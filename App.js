import { View, Text } from 'react-native';
import axios from 'axios';
import MainContainer from "./navigation/MainContainer";
import {useEffect, useState} from "react";
import LoginScreen from "./navigation/screens/LoginScreen";
import RegisterScreen from "./navigation/screens/RegisterScreen";

const App = () => {
    const [temperature, setTemperature] = useState(null);
    const [humidity, setHumidity] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://172.20.10.10:3002/api/data', {timeout:  5000});
                const data = response.data;

                setTemperature(data.temperature);
                setHumidity(data.humidity);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <MainContainer
            temperature = {temperature}
            humidity = {humidity}/>
        // <LoginScreen>
        //
        // </LoginScreen>

        // <RegisterScreen>
        //
        // </RegisterScreen>
    );
};
export default App;
