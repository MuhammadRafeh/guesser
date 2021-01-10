import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import colors from '../constants/colors';
import TitleText from './TitleText';

const Header = props => {
    return (
        <View style={styles.header}>
            <TitleText style={styles.text}>{props.title}</TitleText>
        </View>
    );
}

export default Header;

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 26,
        backgroundColor: Platform.OS === 'android' ? colors.primary : 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: Platform.OS === 'ios' ? '#ccc' : 'transparent',
        borderBottomWidth: Platform.OS === 'ios' ? 1: 0
    },
    text: {
        color: Platform.OS === 'ios' ? colors.primary : '#fff'
    }
});
