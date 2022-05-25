import { View, StyleSheet, Dimensions } from "react-native"
import Colors from "../../constants/colors"

function Card({ children }) {
    return <View style={styles.inputContainer} >
        {children}
    </View>
}


export default Card;

const deviceWidth = Dimensions.get("window").width

const styles = StyleSheet.create({
    inputContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 24,
        padding: 16,
        marginTop: deviceWidth < 380 ? 18 : 36,
        backgroundColor: Colors.primary700,
        borderRadius: 8,
        // elevation 2  // elevation yra androidui shadow boxui
        elevation: 4,
        // ios dedam shadow properties, kad seselis butu
        shadowColor: "black", // shadow spalva
        shadowOffset: { width: 3, height: 4 }, //shadow pozicija kur bus ar i sona i virsu
        shadowRadius: 6, // shadow plotas koks bus 
        shadowOpacity: 0.5, // shadow stiprumas

    },
})