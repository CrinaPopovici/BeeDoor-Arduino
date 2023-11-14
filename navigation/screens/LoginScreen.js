import React from 'react';
import { SafeAreaView, StyleSheet, Dimensions, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import MainContainer from "../MainContainer";
// import { Colors } from '../constants';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { Routes } from '../routes/routes';
// import { RouteProp, useRoute } from '@react-navigation/native';
// import { RouteParams } from '../routes/types';

// type RouteType = RouteProp<RouteParams, Routes.Login>;

const LoginScreen = () => {
    const [hidePassword, setHidePassword] = React.useState(true);
    //   const route = useRoute<RouteType>();

    return (
        // <KeyboardAwareScrollView style={styles.background}>
        <SafeAreaView style={styles.container}>
            <View style={styles.mainButtonsContainer}>
                <Text style={styles.logo}>Log in</Text>
                <TextInput
                    mode="outlined"
                    inputMode="email"
                    style={styles.input}
                    placeholder="Email"
                    outlineStyle={styles.inputField}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    mode="outlined"
                    outlineStyle={styles.inputField}
                    secureTextEntry={hidePassword}
                    right={<TextInput.Icon icon="eye" onPress={() => setHidePassword(!hidePassword)} />}
                />
                <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('MainContainer')}>
                    Login
                </Button>
                <Text style={styles.registerText} >
                    Don't have an account? {"\n"}
                    Register now!
                </Text>
            </View>
            <Button mode="text" style={styles.button}>
                Forgot password?
            </Button>
        </SafeAreaView>
        // </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    background: {
        // backgroundColor: Colors.background,
    },
    inputField: {
        borderRadius: 5,
        // backgroundColor: Colors.inputBackground,
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
        height: Dimensions.get('window').height,
        width: '100%',
        // backgroundColor: Colors.background,
    },
    input: {
        width: '90%',
        marginVertical: 10,
    },
    logo: {
        fontSize: 30,
        marginBottom: 20,
    },
    button: {
        marginVertical: 20,
        width: '90%',
    },
    registerText: {
        textAlign: "center"
    },
});

export default LoginScreen;