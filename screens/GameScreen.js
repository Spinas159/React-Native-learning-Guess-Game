import { View, StyleSheet, Alert, FlatList, useWindowDimensions } from "react-native"
import Title from "../components/ui/Title"
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons"
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton"
import Card from "../components/ui/Card"
import InstructionText from "../components/ui/InstructionText";
import Colors from "../constants/colors";
import GuessLogItem from "../components/game/GuessLogItem";



function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}
// function to gemerate a random number from client input


let minBoundary = 1;
let maxBoundary = 100;
//set boudnary of input number

function GameScreen({ userNumber, onGameOver }) {
    const initialsGuess = generateRandomBetween(1, 100, userNumber);
    // create a const of random num generator and choose arguments

    const [currentGuess, setCurrentGuess] = useState(initialsGuess);
    // hook of guess
    const [guessRounds, setGuessRounds] = useState([initialsGuess])
    //hook of find out a guess rounds 

    const { width, height } = useWindowDimensions();

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver(guessRounds.length);
        }
    }, [currentGuess, userNumber, onGameOver])

    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
    }, [])

    function nextGuessHandler(direction) {
        // direction => lower or greater!!
        if ((direction === 'lower' && currentGuess < userNumber) || (direction === 'greater' && currentGuess > userNumber)) {
            Alert.alert("Don't Lie!!", "You know that is this wrong..", [{ text: "Sorry", style: "Cancel" }])
            return;

        }
        //  function when user try to chean on guessing. Then it shows alert to not do it again

        if (direction === 'lower') {
            maxBoundary = currentGuess - 1;

        } else {
            minBoundary = currentGuess + 1;

        }
        //logic of guessing if is lower

        const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess)
        setCurrentGuess(newRndNumber)
        setGuessRounds(prevGuessRounds => [newRndNumber, ...prevGuessRounds,])
        // set generator of numbers and set up the hooks of react
    }
    const guessRoundsListLength = guessRounds.length
    // create const of find lenght from object

    let content = <>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card>
            <InstructionText style={styles.InstructionText}>Higher or lover?</InstructionText>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}><Ionicons name="md-remove" size={24} color="white" /></PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}><Ionicons name="md-add" size={24} color="white" /></PrimaryButton>
                </View>
            </View>
        </Card>
    </>
    // make in let that later can use this to if statment

    if (width > 490) {
        content = <>

            <View style={styles.buttonContainerWide} >

                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}><Ionicons name="md-remove" size={24} color="white" /></PrimaryButton>
                </View>

                <NumberContainer>{currentGuess}</NumberContainer>

                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}><Ionicons name="md-add" size={24} color="white" /></PrimaryButton>
                </View>


            </View>


        </>
        // if width more that 490 we extract this line of code. (using useWindow state) with small changes on there
    }


    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            {content}
            <View style={styles.listContainer}>
                <FlatList data={guessRounds}
                    renderItem={(itemData) => <GuessLogItem roundNumber={guessRoundsListLength - itemData.index} guess={itemData.item} />}
                    keyExtractor={(item) => item} />
            </View>
        </View>
    )
}



export default GameScreen

const styles = StyleSheet.create({

    screen: {
        flex: 1,
        padding: 24,
        alignItems: "center"

    },
    InstructionText: {
        marginBottom: 12,
        color: Colors.accent500,
        fontSize: 24,
    },
    buttonsContainer: {
        flexDirection: "row",

    },
    buttonContainer: {
        flex: 1,
    },
    buttonContainerWide: {
        flexDirection: "row",
        alignItems: "center"
    },
    listContainer: {
        flex: 1,
        padding: 16,
    }
})