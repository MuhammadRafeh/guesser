import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import colors from '../constants/colors';

const EndGameScreen = props => {
    return (
      <View style={styles.screen}>
        <TitleText>The Game is Over!</TitleText>
        <View style={styles.imageContainer}>
            <Image 
                source={require('../assets/success.png')} 
                // fadeDuration={300}
                // source={{uri: 'https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg'}} 
                style={styles.image}
                resizeMode={'cover'}
            />
        </View>
        <View style={styles.resultContainer}>
            <BodyText style={styles.resultText}>Your phone  take 
                <Text style={styles.highlight}> {props.roundsNumber} </Text>
                rounds to guess the number
                <Text style={styles.highlight}> {props.userNumber}</Text>
            </BodyText>
        </View>
        <Button title="NEW GAME" onPress={props.onRestart} />
      </View>
    );
}

export default EndGameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: 15
    },  
    resultText: {
        textAlign: 'center',
        fontSize: 20
    },
    image: {
       width: '100%',
       height: '100%'
    },
    highlight: {
        color: colors.primary,
        fontFamily: 'open-sans-bold'
    }
});