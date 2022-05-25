import { TextInput, Text, View, StyleSheet, Alert, Dimensions, useWindowDimensions, KeyboardAvoidingView, ScrollView } from "react-native"
import PrimaryButton from "../components/ui/PrimaryButton"
import { useState } from "react"
import Colors from "../constants/colors"
import Title from "../components/ui/Title";
import Card from "../components/ui/Card"
import InstructionText from "../components/ui/InstructionText";

function StartGameScreen({ onPickNumber }) {
    const [enterNumber, setEnterNumber] = useState("")
    // state to client input 

    const { width, height } = useWindowDimensions();
    // native state of change 




    function numbetInputHandler(enteredText) {
        setEnterNumber(enteredText)
    }
    //function to handle client input to state

    function resetInputHandler() {
        setEnterNumber("")
    }
    // function to reset client input in state

    function confimrInputHandler() {
        const chosenNumber = parseInt(enterNumber);

        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {

            Alert.alert("Invalid Number", "Number has to be a number between 1 and 99.", [{ text: "Okay", style: "destructive", onPress: resetInputHandler }])
            return;
        }
        onPickNumber(chosenNumber);
    }
    // make the input to number not string and make if to create a pop up alert to show if client put a bigger number that 99 or les that 0

    const marginTopdimensions = height < 400 ? 50 : 100;
    // used native state put margin when height is less that 400 to 50 or if its more then 100


    return (
        <ScrollView style={styles.screen}>
            <KeyboardAvoidingView style={styles.screen} behavior="position" >
                {/* add KeyboardAvoidingView tag from react native. This one is for pop up keyboard in input section
                it lets you to change how everything will be added after pop up like behavior   */}
                <View style={[styles.rootContainer, { marginTop: marginTopdimensions }]}>
                    <Title>Guess My Number</Title>
                    <Card>
                        <InstructionText style={styles.instructionText}>Enter a number</InstructionText>
                        <TextInput
                            style={styles.numberInput}
                            maxLength={2}
                            keyboardType="number-pad"
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={enterNumber}
                            onChangeText={numbetInputHandler}
                        // text input of number with conditions
                        />
                        <View style={styles.buttonsContainer}>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton onPress={resetInputHandler} >Reset</PrimaryButton>
                            </View>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton
                                    onPress={confimrInputHandler}
                                >Confirm</PrimaryButton>
                            </View>

                        </View>

                    </Card>
                </View>
            </KeyboardAvoidingView>

        </ScrollView>

    )
}


export default StartGameScreen


const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    rootContainer: {
        flex: 1,
        alignItems: "center"
    },


    numberInput: {
        height: 50,
        width: 70,
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: "bold",
        textAlign: "center",

    },
    buttonsContainer: {
        flexDirection: "row",

    },
    buttonContainer: {
        flex: 1,
    },
    instructionText: {
        color: Colors.accent500,
        fontSize: 24
    },

})