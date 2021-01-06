import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Header from './components/Header';
import EndGameScreen from './screens/EndGameScreen';
import GameScreen from './screens/GameScreen';
import StartGameScreen from './screens/StartGameScreen';

function App() {

  const [userNumber, setUserNumber] = useState();
  const [rounds, setRounds] = useState(0)

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setRounds(0);
  }

  onGameEndHandler = rounds => {
    setRounds(rounds);
  }

  let content = <StartGameScreen onStartGame={startGameHandler}/>;
  
  if (userNumber && rounds <= 0) {
     content = <GameScreen userChoice={userNumber} onGameEnd={onGameEndHandler}/>
  } else if (userNumber && rounds > 0) {
    content = <EndGameScreen />
  }
  
  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
      {content}
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
