import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    Alert,
    ScrollView,
    FlatList,
    Dimensions,
} from "react-native";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import NumberContainer from "../components/NumberContainer";
import defaultStyles from "../constants/default-styles";
import { Ionicons } from "@expo/vector-icons";
import BodyText from "../components/BodyText";
import * as ScreenOrientation from 'expo-screen-orientation';

const generateRandomNumber = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomNumber(min, max, exclude);
    } else {
        return rndNum;
    }
};

const renderRow = (listLength, Item) => {
    console.log(listLength)
    return (
        <View style={styles.listItem}>
            <BodyText>#{listLength - Item.index}</BodyText>
            <BodyText>{Item.item}</BodyText>
        </View>
    )
}

const GameScreen = (props) => {
    // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)

    const initialGuess = generateRandomNumber(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const [windowDimensions, setwindowDimensions] = useState(Dimensions.get('window'))

    const low = useRef(1);
    const high = useRef(100);

    const { userChoice, onGameEnd } = props;

    useEffect(() => {
        const calculateDimensions = () => {
            setwindowDimensions(Dimensions.get('window'))
        }
        Dimensions.addEventListener('change', calculateDimensions)
        return () => {
            Dimensions.removeEventListener('change', calculateDimensions)
        }
    })

    useEffect(() => {
        if (userChoice === currentGuess) onGameEnd(pastGuesses.length);

    }, [currentGuess, userChoice, onGameEnd]);

    const guessHandler = (direction) => {
        if (
            (direction === "lower" && currentGuess < props.userChoice) ||
            (direction === "greater" && currentGuess > props.userChoice)
        ) {
            Alert.alert("Don't lie!", "Guide Correctly Please!", [{ text: "Ok" }]);
            return;
        }
        if (direction === "lower") {
            high.current = currentGuess;
        } else {
            low.current = currentGuess + 1;
        }
        const currentNumber = generateRandomNumber(
            low.current,
            high.current,
            currentGuess
        );
        setCurrentGuess(currentNumber);
        // setRounds(prevState => prevState + 1)
        setPastGuesses((currentGuesses) => [currentNumber.toString(), ...currentGuesses]);
    };

    let listContainer = styles.listContainer

    if (windowDimensions.width < 350) {
        listContainer = styles.listContainerBig
    }

    if (windowDimensions.height < 500) {
        return (
            <View style={styles.screen}>
                <Text style={defaultStyles.title}>Opponent's Guess</Text>
                <View style={styles.controls}>
                    {/* <Button title="Lower" onPress={guessHandler.bind(null, 'lower')}/> */}
                    <MainButton onPress={guessHandler.bind(null, "lower")}>
                        <Ionicons name={"md-remove"} size={24} />
                    </MainButton>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <MainButton onPress={guessHandler.bind(null, "grlistContainereater")}>
                        <Ionicons name={"md-add"} size={24} />
                    </MainButton>
                    {/* <Button title="Greater" onPress={guessHandler.bind(null, 'greater')}/> */}
                </View>
                <View style={listContainer}>
                    {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) =>
                        renderRow(guess, pastGuesses.length - index)
                    )}
                </ScrollView> */}
                    <FlatList
                        data={pastGuesses}
                        renderItem={renderRow.bind(null, pastGuesses.length)}
                        keyExtractor={index => index}
                        contentContainerStyle={styles.list}
                    />
                </View>
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            <Text style={defaultStyles.title}>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                {/* <Button title="Lower" onPress={guessHandler.bind(null, 'lower')}/> */}
                <MainButton onPress={guessHandler.bind(null, "lower")}>
                    <Ionicons name={"md-remove"} size={24} />
                </MainButton>
                <MainButton onPress={guessHandler.bind(null, "grlistContainereater")}>
                    <Ionicons name={"md-add"} size={24} />
                </MainButton>
                {/* <Button title="Greater" onPress={guessHandler.bind(null, 'greater')}/> */}
            </Card>
            <View style={listContainer}>
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) =>
                        renderRow(guess, pastGuesses.length - index)
                    )}
                </ScrollView> */}
                <FlatList
                    data={pastGuesses}
                    renderItem={renderRow.bind(null, pastGuesses.length)}
                    keyExtractor={index => index}
                    contentContainerStyle={styles.list}
                />
            </View>
        </View>
    );
};

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    listContainer: {
        width: "60%",
        flex: 1,
        // backgroundColor: 'green'
    },
    listContainerBig: {
        width: "80%",
        flex: 1,
        // backgroundColor: 'green'
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%'
    },
    list: {
        flexGrow: 1, //flexGrow says that it must be able to take space as it can get
        // alignItems: "center",
        justifyContent: "flex-end",
        // backgroundColor: 'blue'
    },
    listItem: {
        padding: 15,
        borderColor: "black",
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
        width: "100%",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        // marginTop: 20,
        marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
        width: 400,
        maxWidth: "90%",
    },
});
