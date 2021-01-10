import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../constants/colors';

const MainButton = props => {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity activeOpacity={0.2} onPress={props.onPress}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{props.children}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default MainButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25
    },
    buttonText: {
        color: '#fff',
        fontFamily: 'open-sans-bold',
        fontSize: 18
    }
});