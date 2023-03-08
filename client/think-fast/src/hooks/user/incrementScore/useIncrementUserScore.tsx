import { useState, useContext } from "react";

interface IncrementUserScoreResponse {
  success: boolean;
  message?: string;
}

interface UseIncrementUserScoreReturnType {
  incrementUserScore: (username: string) => Promise<IncrementUserScoreResponse>;
  error: string;
}

export const useIncrementUserScore = (): UseIncrementUserScoreReturnType => {
  const [error, setError] = useState("");

  const incrementUserScore = async (username: string) => {
    const response = await fetch(
      `http://localhost:3001/users/${username}/increment-score`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to increment user score.");
    }

    const data = await response.text();

    if (!data && data !== "") {
      const jsonData = JSON.parse(data);
      setError(jsonData.message || "Failed to increment user score");
      return jsonData;
    } else {
      setError("");
      return { success: true, message: data };
    }
  };

  return { incrementUserScore, error };
};
