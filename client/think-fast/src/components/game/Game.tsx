import React, { useState, useEffect, useContext } from "react";

import { Circle } from "./circle";
import { FeedbackLabel, FeedbackText } from "./feedbackLabel";
import { useIncrementUserScore } from "../../hooks/user/incrementScore";
import { UserContext } from "../../context/user";

import { getRandomPosition, getRandomTimeToWait } from "./utils";
import "./game.css";

export type Position = "left" | "right";
type GameState = "waiting" | "showing" | "finished";

const Game: React.FC = () => {
  const { username } = useContext(UserContext);
  const { incrementUserScore } = useIncrementUserScore();
  const [gameState, setGameState] = useState<GameState>("waiting");
  const [indicatorPosition, setIndicatorPosition] = useState<
    Position | undefined
  >();
  const [feedback, setFeedback] = useState<FeedbackText | undefined>();
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>();

  const handleKeyPress = (event: KeyboardEvent) => {
    if (gameState === "showing") {
      if (event.key === "a" && indicatorPosition === "left") {
        setFeedback("Success");
        incrementUserScore(username);
      } else if (event.key === "l" && indicatorPosition === "right") {
        setFeedback("Success");
        incrementUserScore(username);
      } else {
        setFeedback("Wrong Key");
      }

      setIndicatorPosition(undefined);
      setGameState("finished");
    } else if (gameState === "waiting") {
      setFeedback("Too Soon");
      setGameState("finished");
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  });

  useEffect(() => {
    if (gameState === "waiting") {
      setFeedback(undefined);

      const setTimeoutForUserInput = () => {
        return setTimeout(() => {
          setIndicatorPosition(undefined);
          setGameState("finished");
          setFeedback("Too Late");
        }, 1000);
      };

      const setTimeoutToShowNextCircle = () => {
        return setTimeout(() => {
          const position = getRandomPosition();
          setIndicatorPosition(position);
          setGameState("showing");
          setTimer(setTimeoutForUserInput());
        }, getRandomTimeToWait());
      };

      const timeToNextCircle = setTimeoutToShowNextCircle();

      setTimer(timeToNextCircle);
    } else if (gameState === "finished") {
      if (timer) clearTimeout(timer);

      setTimeout(() => {
        setGameState("waiting");
      }, 1000);
    }
  }, [gameState]);

  return (
    <div className="container">
      {gameState === "waiting" ? (
        <></>
      ) : gameState === "showing" ? (
        <Circle position={indicatorPosition} />
      ) : (
        <></>
      )}
      {feedback && <FeedbackLabel text={feedback} />}
    </div>
  );
};

export default Game;
