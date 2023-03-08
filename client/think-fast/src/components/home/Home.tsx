import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user";
import { useCreateUser } from "../../hooks/user/create";

import "./home.css";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { createUser } = useCreateUser();
  const { username, setUsername } = useContext(UserContext);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleStartClick = async () => {
    try {
      const response = await createUser({ username, score: 0 });
      // TODO: Message to user if username is taken
    } catch (error) {
      // console.log("error while trying to create user", error) // debug
    }

    navigate("/game");
  };

  return (
    <div className="home">
      <input
        className="input-name"
        type="text"
        placeholder="Enter your name"
        value={username}
        onChange={handleUsernameChange}
      />
      <button className="start-button" type="button" onClick={handleStartClick}>
        START!
      </button>
    </div>
  );
};

export default Home;
