import { Position } from "./Game";

export const getRandomPosition = (): Position => {
  return Math.random() < 0.5 ? "left" : "right";
};

export const getRandomTimeToWait = (): number => {
  return Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;
};
