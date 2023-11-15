import React from 'react';
import { SafeAreaView, StyleSheet, Dimensions, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import {Routes} from  "./routes"
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import type {RouteParams} from "../../routes/types";
type RoutePropType = StackNavigationProp<RouteParams, Routes.SignUp>;

const RegisterScreen = () => {
    const [hidePassword, setHidePassword] = React.useState(true);
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mainButtonsContainer}>
                <Text style={styles.text2}>Sign up                               and jump right in</Text>
                <TextInput
                    mode="outlined"
                    inputMode="text"
                    style={styles.input}
                    placeholder="Name"
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
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#666B78"
                    mode="outlined"
                    outlineStyle={styles.inputField}
                    right={<TextInput.Icon icon="eye" onPress={() => setHidePassword(!hidePassword)} />}

                />

                <Button mode="contained" style={styles.button} onPress={() => {
                    navigation.navigate(Routes.Login)
                }} >
                    Register
                </Button>
            </View>
            <Button mode="text" style={styles.button} onPress={() => {
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
        marginVertical: 20,
        width: '87.2%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    }
});

export default RegisterScreen;
