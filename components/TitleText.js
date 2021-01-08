import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TitleText = props => {
    return (
        <Text style={{...styles.title, ...props.style}}>
            {props.children}
        </Text>
    );
}

export default TitleText;

const styles = StyleSheet.create({
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    }
})