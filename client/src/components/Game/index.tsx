import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { addMessage } from "@slices/chat";
import { startGame, quitGame, setUserId, updateGame } from "@slices/game";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import type { IMessage, IStartGameData, IGame } from "@types";
import SocketContext from "@context/SocketContext";
import Board from "./Board";
import Waiting from "./Waiting";
import Chat from "./Chat";
import * as styles from "./styles";

const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL;

if (!socketUrl) {
  throw new Error("socket url missing");
}

const Game = () => {
  const username = useAppSelector((state) => state.user.name);
  const gameStatus = useAppSelector((state) => state.game.status);
  const dispatch = useAppDispatch();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketServer = io(socketUrl);

    setSocket(socketServer);

    socketServer.on("assignUserId", (id: string) => {
      dispatch(setUserId(id));
    });

    socketServer.on("message", (message: IMessage) =>
      dispatch(addMessage(message))
    );

    socketServer.on(
      "startGame",
      ({ activePlayer, players }: IStartGameData) => {
        dispatch(startGame({ players, activePlayer }));
      }
    );

    socketServer.on("play", (game: IGame) => {
      dispatch(updateGame(game));
    });

    socketServer.on("quitGame", () => {
      dispatch(quitGame());
    });

    socketServer.on("connect", () => {
      socketServer.emit("setUpPlayer", username);
      socketServer.emit("startGame");
    });

    return () => {
      socketServer.disconnect();
    };
  }, [username, dispatch]);

  if (!socket) {
    return null;
  }

  return (
    <SocketContext.Provider value={socket}>
      <styles.Main>
        {gameStatus === "waiting" ? <Waiting /> : <Board />}
        <Chat />
      </styles.Main>
    </SocketContext.Provider>
  );
};

export default Game;
