import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  KeyboardAvoidingView,
  StatusBar,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "./components/BackButton";

const Onboarding = () => {
  const router = useRouter();
  const { width: screenWidth } = useWindowDimensions();

  const styles = StyleSheet.create({
    safeContainer: {
      flex: 1,
      backgroundColor: "#000",
    },
    keyboardContainer: {
      flex: 1,
    },
    background: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      flex: 1,
      width: "100%",
      paddingLeft: screenWidth * 0.13,
      paddingRight: "5%",
      paddingVertical: "3%",
      gap: 10,
    },
    text: {
      fontFamily: "HS",
      fontSize: 24,
      color: "#fff",
    },
    astronautImage: {
      width: screenWidth * 0.12,
      height: (screenWidth * 0.12) / (121 / 148),
      position: "absolute",
      top: "50%",
      left: 0,
    },
    rulesImage: {
      width: screenWidth * 0.36,
      height: (screenWidth * 0.36) / (350 / 220),
      transform: [{ translateX: "-10%" }],
    },
  });

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={"padding"}
        keyboardVerticalOffset={0}
      >
        <StatusBar
          hidden={true}
          backgroundColor="#000"
          barStyle="light-content"
        />

        <ImageBackground
          source={require("../assets/images/onboarding.png")}
          style={styles.background}
        >
          <BackButton />

          <Image
            source={require("@/assets/images/astronaut.png")}
            style={styles.astronautImage}
          />

          <View style={styles.container}>
            <Text style={styles.text}>
              Hello, astronaut! In this game, you will embark on an amazing
              journey among the stars, collecting coins and bonuses while
              avoiding obstacles. Coins can be spent in the store to buy other
              rockets.
            </Text>

            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.text, { flex: 1 }]}>
                You need to move the plane up or down using the buttons
              </Text>
              <Image
                source={require("@/assets/images/onboarding-image.png")}
                style={styles.rulesImage}
              />
            </View>

            <TouchableOpacity onPress={() => router.replace("/game")}>
              <Image
                source={require("@/assets/images/buttons/play.png")}
                style={{
                  width: 106,
                  height: 38,
                  transform: [{ translateY: "-300%" }],
                }}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Onboarding;
