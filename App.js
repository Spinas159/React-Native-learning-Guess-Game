import { useState } from "react"
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import StartGameScreen from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient"
import GameScreen from "./screens/GameScreen"
import Colors from "./constants/colors"
import GameOver from "./screens/GameOver"
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading"

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true)
  const [guessRounds, setGuessRounds] = useState(0)
  //hooks

  const [fontsLoaded,] = useFonts({
    'open-sans': require("./assets/fonts/OpenSans-Regular.ttf"),
    'open-sans-bold': require("./assets/fonts/OpenSans-Bold.ttf")
  })
  // import local fonts to this app

  if (!fontsLoaded) {
    return <AppLoading />
  }
  // if fonts wont be loaded to showing from expo apploading

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false)
  }
  // picked number handler

  function gameOverHandler(numberOfRounds) {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds)
  }
  // change to game over with onPress command

  function startNewGameHandler() {
    setUserNumber(null);
    setGuessRounds(0);

  }
  // hook of start new game with onPress command

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />

  //set screen as StartGameScreen tag

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
  }

  //if usernumber pass ( true) then will be transfet to GameScreen page

  if (gameIsOver && userNumber) {
    screen = <GameOver userNumber={userNumber} roundsNumber={guessRounds} onStartNewGame={startNewGameHandler} />
  }
  // if statment when it will be game over screen



  return (<LinearGradient colors={[Colors.primary650, Colors.accent500]} style={styles.rootScreen} >
    <ImageBackground source={require("./assets/background.png")}
      resizeMode="cover"
      style={styles.rootScreen}
      imageStyle={styles.backgroundImage}>
      <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>


    </ImageBackground>

  </LinearGradient>
  );
}

//LinearGradient is expo command to mix up two colors in this code and make linear one

//SafeAreaView all text and everything will be in visible screen before styling

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,


  },
  backgroundImage: {
    opacity: 0.5,
  }
})