import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Text, TextInput} from 'react-native-paper';

import Title from "../Components/Title";
import Subtitle from "../Components/Subtitle";
import Screen from "../Components/layout/Screen";
import {UserProfile} from "../types/types";
import {route} from "express/lib/router";


const UserInfoScreen: React.FC = () => {
    const {name} = route?.params;
    const [userInfo, setUserInfo] = useState<Partial<UserProfile>>({
        hobby: "jogging",
    });


    return (
        <Screen>
            <ScrollView contentContainerStyle={styles.scrollViewContainer} bounces={false}>
                <Title title={'Welcome!'}/>
                <Subtitle subtitle={'Let’s see your infos'} style={styles.subtitle}/>
                <View style={styles.inputFieldsContainer}>

                    <Text style={styles.inputLabel}>Which is your hobby?</Text>
                    <TextInput
                        mode="outlined"
                        style={styles.input}
                        placeholder={'jogging'}
                        keyboardType="numeric"
                        onChangeText={(text) => setUserInfo({...userInfo, height: parseInt(text, 10)})}
                        outlineStyle={styles.inputField}
                    />

                </View>
            </ScrollView>
        </Screen>
    );
};

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexDirection: 'column',
    },
    titleContainer: {},
    subtitle: {
        marginTop: 10,
        marginHorizontal: 70,
        marginBottom: 30,
    },
    inputFieldsContainer: {
        flexDirection: 'column',
        flexGrow: 1,
    },
    inputLabel: {
        fontSize: 15,
        marginHorizontal: 50,
        textAlign: 'center',
    },
    selectable: {
        height: 48,
        marginBottom: 20,
        marginTop: 10,
    },
    inputField: {
        borderRadius: 5,
        borderWidth: 0,
    },
    input: {
        textAlign: 'center',
        height: 48,
        marginBottom: 20,
        marginTop: 5,
    },
    nextButton: {
        marginTop: 40,
    },
});

export default UserInfoScreen;
