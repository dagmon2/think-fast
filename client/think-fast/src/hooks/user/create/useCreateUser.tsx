import { useState } from "react";

interface User {
  username: string;
  score?: number;
}

interface CreateUserResponse {
  success: boolean;
  message?: string;
}

interface CreateUserHook {
  createUser: (user: User) => Promise<CreateUserResponse>;
  error: string;
}

export const useCreateUser = (): CreateUserHook => {
  const [error, setError] = useState("");

  const createUser = async (user: User): Promise<CreateUserResponse> => {
    const response = await fetch("http://localhost:3001/users/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to create user: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.text();

    if (!data && data !== "") {
      const jsonData = JSON.parse(data);
      setError(jsonData.message || "Failed to create user");
      return jsonData;
    } else {
      setError("");
      return { success: true, message: data };
    }
  };

  return { createUser, error };
};
