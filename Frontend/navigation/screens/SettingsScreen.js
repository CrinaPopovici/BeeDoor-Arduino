import * as React from 'react';
import {View, Text, Button} from 'react-native';

import PowerScreen from "./PowerScreen";

export default function SettingsScreen({navigation}) {
    return (
        <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'flex-start'}}>
            <PowerScreen/>
        </View>
    );
}
