import React from 'react';
import { Text, StyleSheet } from 'react-native';

const BodyText = props => {
    return (
        <Text style={styles.body}>
            {props.children}
        </Text>
    );
}

export default BodyText;

const styles = StyleSheet.create({
    body: {
        fontFamily: 'open-sans-bold'
    }
});