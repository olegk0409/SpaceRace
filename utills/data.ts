import { ImageSourcePropType } from "react-native";
import { Rocket } from "./types";

export const shopRockets: Rocket[] = [
  {
    id: '111',
    price: 0,
    name: 'default',
    img: require('@/assets/images/rockets/default.png')
  },
  {
    id: '222',
    price: 50,
    name: 'pink',
    img: require('@/assets/images/rockets/pink.png')
  },
  {
    id: '333',
    price: 50,
    name: 'emerald',
    img: require('@/assets/images/rockets/emerald.png')
  },
  {
    id: '444',
    price: 50,
    name: 'purple',
    img: require('@/assets/images/rockets/purple.png')
  },
  {
    id: '555',
    price: 50,
    name: 'white',
    img: require('@/assets/images/rockets/white.png')
  },
  {
    id: '666',
    price: 50,
    name: 'blue',
    img: require('@/assets/images/rockets/blue.png')
  },
  {
    id: '777',
    price: 50,
    name: 'red',
    img: require('@/assets/images/rockets/red.png')
  },
];

export const gameRockets: Record<string, ImageSourcePropType> = {
  'default': require('@/assets/images/models/default.png'),
  'pink': require('@/assets/images/models/pink.png'),
  'emerald': require('@/assets/images/models/emerald.png'),
  'purple': require('@/assets/images/models/purple.png'),
  'white': require('@/assets/images/models/white.png'),
  'blue': require('@/assets/images/models/blue.png'),
  'red': require('@/assets/images/models/red.png'),
}

export const trapsConfig = {
  coin: {
    source: require("@/assets/images/traps/coin.png"),
    width: 45,
    height: 46,
    reward: 1,
  },
  "2x": {
    source: require("@/assets/images/traps/2x.png"),
    width: 47,
    height: 27,
    reward: 2,
  },
  "10x": {
    source: require("@/assets/images/traps/10x.png"),
    width: 57,
    height: 27,
    reward: 10,
  },
  meteor: {
    source: require("@/assets/images/traps/meteor.png"),
    width: 80,
    height: 80,
    reward: 0,
  },
} as const;