import React, { useCallback, useState } from "react";
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
  FlatList,
} from "react-native";
import { useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "./components/BackButton";
import { loadDashboardItems, saveDashboardItems } from "@/utills/functions";
import MoneyIndicator from "./components/MoneyIndicator";
import { shopRockets } from "@/utills/data";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Rocket } from "@/utills/types";

const Shop = () => {
  const { width: screenWidth } = useWindowDimensions();
  const [coins, setCoins] = useState(0);
  const [selectedRocket, setSelectedRocket] = useState("default");
  const [availableRockets, setAvailableRockets] = useState(["default"]);

  useFocusEffect(
    useCallback(() => {
      loadDashboardItems("coins", setCoins);
      loadDashboardItems("selectedRocket", setSelectedRocket);
      loadDashboardItems("availableRockets", setAvailableRockets);
    }, [])
  );

  const onButtonPress = async (item: Rocket) => {
    const isAvailable = availableRockets.includes(item.name);
    const isSelected = item.name === selectedRocket;

    if (isSelected) return;
    if (isAvailable) {
      await saveDashboardItems("selectedRocket", item.name);
      setSelectedRocket(item.name);
      return;
    }

    const isEnoughMoney = coins >= item.price;
    if (isEnoughMoney) {
      setCoins((prevCoins) => +prevCoins - +item.price);
      saveDashboardItems("coins", +coins - +item.price);

      setAvailableRockets((prev) => [...prev, item.name]);
      saveDashboardItems("availableRockets", [...availableRockets, item.name]);
    }
  };

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
      paddingVertical: "5%",
    },
    rocketContainer: {
      alignItems: "center",
      justifyContent: "center",
    },
    rocketImage: {
      width: screenWidth * 0.15,
      height: (screenWidth * 0.15) / (135 / 207),
    },
    rocketButton: {
      width: screenWidth * 0.12,
      height: (screenWidth * 0.12) / (95 / 34),
      alignItems: "center",
      justifyContent: "center",
    },
    rocketText: {
      fontFamily: "HS",
      color: "#fff",
      fontSize: 16,
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

          <MoneyIndicator coins={coins} />

          <FlatList
            data={shopRockets}
            keyExtractor={(item) => item.id}
            horizontal
            contentContainerStyle={{ paddingHorizontal: 40, gap: 30 }}
            renderItem={({ item }) => (
              <View style={styles.rocketContainer}>
                <Image source={item.img} style={styles.rocketImage} />

                <TouchableOpacity onPress={() => onButtonPress(item)}>
                  <ImageBackground
                    source={require("@/assets/images/buttons/button-bg.png")}
                    style={styles.rocketButton}
                    resizeMode="contain"
                  >
                    {selectedRocket === item.name ? (
                      <FontAwesome name="check" size={24} color="white" />
                    ) : availableRockets.includes(item.name) ? (
                      <Text style={styles.rocketText}>Use</Text>
                    ) : (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <Text style={styles.rocketText}>{item.price}</Text>
                        <Image
                          source={require("@/assets/images/coin-small.png")}
                        />
                      </View>
                    )}
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            )}
          />
        </ImageBackground>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Shop;
