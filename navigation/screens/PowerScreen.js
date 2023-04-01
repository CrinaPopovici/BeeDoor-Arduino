import * as React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

export default function PowerScreen({navigation}){
    return(
        <View style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
        <Button style={{width: '100%'}} title='On'></Button>
        <Button title='Off'></Button>
        </View>
    );


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },



});
