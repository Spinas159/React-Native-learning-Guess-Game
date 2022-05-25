
import { Text, View, StyleSheet, Dimensions } from "react-native"
import Colors from "../../constants/colors"

function NumberContainer({ children }) {
    return (
        <View style={styles.container}>
            <Text style={styles.numberText}>{children}</Text>
        </View>
    )
}

export default NumberContainer

const deviceWidth = Dimensions.get("window").width
// native function of dimensions

const styles = StyleSheet.create({
    container: {
        borderWidth: 4,
        borderColor: Colors.accent500,
        padding: deviceWidth < 380 ? 12 : 24,
        margin: deviceWidth < 380 ? 12 : 24,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center"
    },
    numberText: {
        color: Colors.accent500,
        fontSize: deviceWidth < 380 ? 28 : 36,
        fontFamily: "open-sans-bold",
    },
})

//dimemsoms tai native objektas. pagal kuri galima nustatyti ka norime paimti is style kaip pvz dydi ir pagal tai 
// if devicewitdh maziau nei 380 tai margin buna 12 o jeigu daugiau tai 24