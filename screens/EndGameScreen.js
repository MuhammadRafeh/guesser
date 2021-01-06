import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EndGameScreen = () => {
    return (
      <View style={styles.screen}>
          <Text>The Game is Over!</Text>
      </View> 
    );
}

export default EndGameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});