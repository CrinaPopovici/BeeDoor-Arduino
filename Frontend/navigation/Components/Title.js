import * as React from 'react';
import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native';

interface titleProps {
    title: string;
    style?: StyleProp<TextStyle>;
}

const Title: React.FC<titleProps> = (props) => {
    const {title, style} = props;
    return <Text style={[styles.title, style]}>{title}</Text>;
};

export default Title;

const styles = StyleSheet.create({
    title: {
        fontSize: 35,
        textAlign: 'center',
        marginVertical: 20,
    },
});
