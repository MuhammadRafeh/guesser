import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import NumberContainer from '../components/NumberContainer';
import defaultStyles from '../constants/default-styles';

const generateRandomNumber = ( min, max, exclude ) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomNumber(min, max, exclude);
    } else {
        return rndNum;
    }
}

const GameScreen = props => {
    const [currentGuess, setCurrentGuess] = useState(
        generateRandomNumber(1, 100, props.userChoice)
    );
    const [rounds, setRounds] = useState(0);

    const low = useRef(1);
    const high = useRef(100);

    const { userChoice, onGameEnd } = props
    
    useEffect(() => {
        if (userChoice === currentGuess) 
            onGameEnd(rounds);
    }, [currentGuess, userChoice])

    const guessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t lie!', 'Guide Correctly Please!', [{text: 'Ok'}])
            return;
        }
        if (direction === 'lower') {
            high.current = currentGuess
        } else {
            low.current = currentGuess
        }
        const currentNumber = generateRandomNumber(low.current, high.current, currentGuess) 
        setCurrentGuess(currentNumber);
        setRounds(prevState => prevState + 1)
    }

    return (
       <View style={styles.screen}>
           <Text style={defaultStyles.title}>Opponent's Guess</Text>
           <NumberContainer>{currentGuess}</NumberContainer>
           <Card style={styles.buttonContainer}>
               {/* <Button title="Lower" onPress={guessHandler.bind(null, 'lower')}/> */}
               <MainButton onPress={guessHandler.bind(null, 'lower')}>
                    Lower
               </MainButton>
               <MainButton onPress={guessHandler.bind(null, 'greater')}>
                    Greater
               </MainButton>
               {/* <Button title="Greater" onPress={guessHandler.bind(null, 'greater')}/> */}
           </Card>
       </View> 
    );
}

export default GameScreen;
    
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 400,
        maxWidth: '90%'
    }
});
