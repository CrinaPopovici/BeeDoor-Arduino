import * as React from 'react';
import {ReactNode} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from 'react-native/Libraries/NewAppScreen';

interface ScreenProps {
    style?: StyleProp<ViewStyle>;
    children: ReactNode;
}

const Screen: React.FC<ScreenProps> = (ScreenProps) => {
    const {style, children} = ScreenProps;
    return <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        flex: 1,
        margin: 15,
    },
});

export default Screen;
