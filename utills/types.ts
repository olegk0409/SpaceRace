import { ImageSourcePropType } from "react-native";
import { trapsConfig } from "./data";

export type Rocket = {
  id: string;
  price: number;
  name: string;
  img: ImageSourcePropType;
}

export type TrapType = keyof typeof trapsConfig;
