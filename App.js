import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading'

import Header from './components/Header';
import EndGameScreen from './screens/EndGameScreen';
import GameScreen from './screens/GameScreen';
import StartGameScreen from './screens/StartGameScreen';

function App() {

  const [userNumber, setUserNumber] = useState();
  const [rounds, setRounds] = useState(0)

  let [fontsLoaded] = useFonts({
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const configureNewGameHandler = () => {
    setRounds(0);
    setUserNumber(null);
  };

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setRounds(0);
  }

  const onGameEndHandler = rounds => {
    setRounds(rounds);
  }

  let content = <StartGameScreen onStartGame={startGameHandler}/>;

  if (userNumber && rounds <= 0) {
     content = <GameScreen userChoice={userNumber} onGameEnd={onGameEndHandler}/>
  } else if (userNumber && rounds > 0) {
    content = <EndGameScreen 
                roundsNumber={rounds} 
                userNumber={userNumber} 
                onRestart={configureNewGameHandler}
              />
  }
  
  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Guess a Number" />
      {content}
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
