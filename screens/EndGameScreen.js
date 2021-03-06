import React from 'react';
import { View, Text, StyleSheet, Button, Image, Dimensions, ScrollView } from 'react-native';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';
import TitleText from '../components/TitleText';
import colors from '../constants/colors';

const EndGameScreen = props => {
    return (
        <ScrollView>
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
                {/* <Button title="NEW GAME" onPress={props.onRestart} /> */}
                <MainButton onPress={props.onRestart}>
                    NEW GAME
                </MainButton>
            </View>
        </ScrollView>
    );
}

export default EndGameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    imageContainer: {
        // width: 300,
        // height: 300,
        // borderRadius: 150,
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderRadius: (Dimensions.get('window').width * 0.7) / 2,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        // marginVertical: 30,
        marginVertical: Dimensions.get('window').height / 30

    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: Dimensions.get('window').height / 60
    },  
    resultText: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height < 400 ? 16 : 20
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