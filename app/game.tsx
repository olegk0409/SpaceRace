import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  StatusBar,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "expo-router";
import { loadDashboardItems, saveDashboardItems } from "@/utills/functions";
import { Animated } from "react-native";
import Pause from "./components/modals/Pause";
import GameOver from "./components/modals/GameOver";
import useMusic from "./hooks/useMusic";
import useClickSound from "./hooks/useClickSound";
import MoneyIndicator from "./components/MoneyIndicator";
import { gameRockets, trapsConfig } from "@/utills/data";
import { useTraps } from "./hooks/useTraps";

const rocketAspect = 172 / 138;

const Game = () => {
  const [coins, setCoins] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedRocket, setSelectedRocket] = useState("default");
  const rocketY = useRef(new Animated.Value(0)).current;
  const { traps, setTraps, activeAnimations, trapInterval } = useTraps(isPaused, isGameOver);
  const rocketRef = useRef<View>(null);
  const rocketPosition = useRef({ x: 0, y: 0, width: 124, height: 147 });
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  useMusic();
  const clickSound = useClickSound();

  const rocketImage = useMemo(
    () => gameRockets[selectedRocket],
    [selectedRocket]
  );

  useFocusEffect(
    useCallback(() => {
      loadDashboardItems("coins", setCoins);
      loadDashboardItems("selectedRocket", setSelectedRocket);
    }, [])
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (isGameOver) return;

      rocketRef.current?.measureInWindow((x, y, width, height) => {
        rocketPosition.current = { x, y, width, height };
      });

      traps.forEach((trap) => {
        trap.x.addListener(({ value }) => {
          const {x, id, type, y} = trap
          const trapConfig = trapsConfig[type];
          const trapX = value;
          const trapY = y;
          const rocket = rocketPosition.current;

          const isOverlap =
            trapX < rocket.x + rocket.width &&
            trapX + trapConfig.width > rocket.x &&
            trapY < rocket.y + rocket.height &&
            trapY + trapConfig.height > rocket.y;

          if (isOverlap) {
            if (type === "coin" || type === "2x" || type === "10x") {
              const reward = trapsConfig[type].reward;
              saveDashboardItems("coins", coins + reward);
              setCoins((prev) => prev + reward);
            } else {
              setIsGameOver(true);
            }

            x.removeAllListeners();
            setTraps((prev) => prev.filter((t) => t.id !== id));
          }
        });
      });
    }, 100);

    return () => clearInterval(interval);
  }, [traps, isGameOver]);

  const MAX_TOP = -screenHeight * 0.6;
  const MAX_BOTTOM = 0;
  const MOVE_AMOUNT = 50;

  const moveRocketUp = () => {
    clickSound();
    rocketY.stopAnimation((currentValue) => {
      const newValue = Math.max(currentValue - MOVE_AMOUNT, MAX_TOP);
      Animated.timing(rocketY, {
        toValue: newValue,
        duration: 50,
        useNativeDriver: true,
      }).start();
    });
  };

  const moveRocketDown = () => {
    clickSound();
    rocketY.stopAnimation((currentValue) => {
      const newValue = Math.min(currentValue + MOVE_AMOUNT, MAX_BOTTOM);
      Animated.timing(rocketY, {
        toValue: newValue,
        duration: 50,
        useNativeDriver: true,
      }).start();
    });
  };

  const handlePause = () => {
    setIsPaused(true);

    Object.values(activeAnimations.current).forEach((anim) => anim.stop());

    if (trapInterval.current) {
      clearTimeout(trapInterval.current);
      trapInterval.current = null;
    }
  };

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
          source={require("../assets/images/game.png")}
          style={styles.background}
        >
          <View style={styles.container}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity onPress={handlePause} style={{zIndex: 10}}>
                <Image
                  source={require("@/assets/images/buttons/pause.png")}
                  style={{ width: 33, height: 33 }}
                />
              </TouchableOpacity>

              <View>
                <MoneyIndicator coins={coins} />
              </View>
            </View>

            <Animated.View
              ref={rocketRef}
              style={{
                width: screenHeight * 0.2 * rocketAspect,
                height: screenHeight * 0.2,
                transform: [{ translateY: rocketY }],
              }}
            >
              <Image
                source={rocketImage}
                resizeMode="contain"
                style={{
                  width: screenHeight * 0.2 * rocketAspect,
                  height: screenHeight * 0.2,
                }}
              />
            </Animated.View>

            {traps.map((trap) => {
              const config = trapsConfig[trap.type];

              return (
                <Animated.Image
                  key={trap.id}
                  source={config.source}
                  style={{
                    position: "absolute",
                    top: trap.y,
                    width: config.width,
                    height: config.height,
                    transform: [{ translateX: trap.x }],
                  }}
                />
              );
            })}

            <View
              style={{
                position: "absolute",
                right: "5%",
                justifyContent: "center",
                height: '100%',
                gap: 20,
                marginTop: 20,
              }}
            >
              <TouchableOpacity onPress={moveRocketUp}>
                <Image source={require("@/assets/images/buttons/up.png")} />
              </TouchableOpacity>

              <TouchableOpacity onPress={moveRocketDown}>
                <Image source={require("@/assets/images/buttons/down.png")} />
              </TouchableOpacity>
            </View>

            {isPaused && (
              <Pause
                width={screenWidth}
                height={screenHeight}
                coins={coins}
                setIsPaused={setIsPaused}
                activeAnimations={activeAnimations}
              />
            )}

            {isGameOver && (
              <GameOver
                width={screenWidth}
                height={screenHeight}
                coins={coins}
                setIsGameOver={setIsGameOver}
              />
            )}
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
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
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  container: {
    padding: 20,
    paddingVertical: 10,
    flex: 1,
    justifyContent: "space-between",
  },
  text: {
    fontFamily: "HS",
    fontSize: 12,
    color: "#fff",
    textAlign: "center",
  },
});

export default Game;
