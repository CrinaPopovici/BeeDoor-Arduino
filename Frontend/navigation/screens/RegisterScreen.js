import React, {useContext, useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Dimensions, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {Routes} from "./routes"
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import type {RouteParams} from "../../routes/types";
import {homeName, loginName} from "../MainContainer"
import AuthContext from "./AuthContext";
import WelcomeScreen from "./WelcomeScreen";

type RoutePropType = StackNavigationProp<RouteParams, Routes.SignUp>;

const RegisterScreen = () => {
    const [hidePassword, setHidePassword] = React.useState(true);
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mainButtonsContainer}>
                <Text style={styles.text2}>Sign up </Text>
                <TextInput
                    mode="outlined"
                    inputMode="text"
                    style={styles.input}
                    placeholder="First Name"
                    placeholderTextColor="#666B78"
                    outlineStyle={styles.inputField}
                />
                <TextInput
                    mode="outlined"
                    inputMode="text"
                    style={styles.input}
                    placeholder="Last Name"
                    placeholderTextColor="#666B78"
                    outlineStyle={styles.inputField}
                />
                <TextInput
                    mode="outlined"
                    inputMode="text"
                    style={styles.input}
                    placeholder="Role"
                    placeholderTextColor="#666B78"
                    outlineStyle={styles.inputField}
                />
                <TextInput
                    mode="outlined"
                    inputMode="email"
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#666B78"
                    outlineStyle={styles.inputField}
                />
                <TextInput
                    mode="outlined"
                    inputMode="Phone Number"
                    style={styles.input}
                    placeholder="Phone Number"
                    placeholderTextColor="#666B78"
                    outlineStyle={styles.inputField}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#666B78"
                    mode="outlined"
                    outlineStyle={styles.inputField}
                    right={<TextInput.Icon icon="eye" onPress={() => setHidePassword(!hidePassword)}/>}

                />

                <Button mode="contained" style={styles.button} onPress={() => navigation.navigate(homeName)}>
                    Register
                </Button>
            </View>
            <Button mode="text" style={styles.signInText} onPress={() => {
                navigation.navigate(Routes.Login);
            }}>
                Got an account? Sign in!
            </Button>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    inputField: {
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        borderWidth: 0,

    },
    mainButtonsContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flexGrow: 1,
    },
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70%',
        width: '100%',
    },
    input: {
        width: '90%',
        marginVertical: 10,
        color: '#666B78'
    },
    logo: {
        fontSize: 30,
        marginBottom: 20,
    },
    text2: {
        fontSize: 30,
        marginBottom: 8,
        marginTop: 122,
        color: '#000618',
        marginLeft: 24,
        marginRight: 24,
        textAlign: 'center'
    },
    button: {
        marginTop: 15,
        marginBottom: 55,
        width: '87.2%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#ffd407',

    },
    signInText: {
        marginTop: 15,
        marginBottom: 55,
        width: '87.2%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        color: '#ffd407',
    }

});

export default RegisterScreen;
