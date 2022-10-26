import React, { useEffect } from "react";
import { useAppSelector } from "@hooks/redux";
import socket from "@socket";
import Board from "./Board";
import Waiting from "./Waiting";
import Chat from "./Chat";
import * as styles from "./styles";

const Game = () => {
  const username = useAppSelector((state) => state.user.name);
  const gameStatus = useAppSelector((state) => state.game.status);

  useEffect(() => {
    socket.emit("setUpPlayer", username);
    socket.emit("startGame");

    return () => {
      socket.disconnect();
    };
  }, [username]);

  return (
    <styles.StyledMain>
      {gameStatus === "waiting" ? <Waiting /> : <Board />}
      <Chat />
    </styles.StyledMain>
  );
};

export default Game;
