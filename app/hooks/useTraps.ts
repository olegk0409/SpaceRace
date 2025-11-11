import { trapsConfig } from "@/utills/data";
import { TrapType } from "@/utills/types";
import { useEffect, useRef, useState } from "react";
import { Animated, Easing, useWindowDimensions } from "react-native";

export const useTraps = (isPaused: boolean, isGameOver: boolean) => {
  const [traps, setTraps] = useState<{ id: number; type: TrapType; x: Animated.Value; y: number }[]>([]);
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const activeAnimations = useRef<Record<number, Animated.CompositeAnimation>>({});

  const spawnTrap = () => {
    if (isPaused || isGameOver) return;
    const typeKeys = Object.keys(trapsConfig) as TrapType[];
    const trapType = typeKeys[Math.floor(Math.random() * typeKeys.length)];
    const trapId = Date.now();
    const y = Math.random() * screenHeight * 0.6 + 20;
    const x = new Animated.Value(screenWidth);
    const anim = Animated.timing(x, {
      toValue: -300,
      duration: 4000,
      useNativeDriver: true,
      easing: Easing.linear,
    });
    anim.start(({ finished }) => finished && setTraps(prev => prev.filter(t => t.id !== trapId)));
    activeAnimations.current[trapId] = anim;
    setTraps(prev => [...prev, { id: trapId, type: trapType, x, y }]);
  };

const trapInterval = useRef<number | null>(null);

useEffect(() => {
  if (isPaused || isGameOver) return;

  const loop = () => {
    spawnTrap();
    const nextInterval = Math.random() * 1000 + 1000;
    trapInterval.current = setTimeout(loop, nextInterval);
  };

  loop();

  return () => {
    if (trapInterval.current) clearTimeout(trapInterval.current);
  };
}, [isPaused, isGameOver]);

  return { traps, setTraps, activeAnimations, trapInterval };
};