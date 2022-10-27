import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { addMessage } from "@slices/chat";
import {
  startGame,
  playToken,
  resetGame,
  quitGame,
  setUserId,
} from "@slices/game";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import type { IMessage, IStartGameData, IPlayTokenData } from "@types";
import Board from "./Board";
import Waiting from "./Waiting";
import Chat from "./Chat";
import * as styles from "./styles";
import SocketContext from "@context/SocketContext";

const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL;

if (!socketUrl) {
  throw new Error("socket url missing");
}

const Game = () => {
  const username = useAppSelector((state) => state.user.name);
  const gameStatus = useAppSelector((state) => state.game.status);
  const winnerId = useAppSelector((state) => state.game.winnerId);
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

    socketServer.on("playToken", ({ index, activePlayer }: IPlayTokenData) => {
      dispatch(playToken({ index, activePlayer }));
    });

    socketServer.on("resetGame", ({ activePlayer }: IStartGameData) => {
      dispatch(resetGame(activePlayer));
    });

    socketServer.on("quitGame", () => {
      dispatch(quitGame());
    });

    socketServer.on("connect", () => {
      socketServer.emit("setUpPlayer", username);
      socketServer.emit("startGame");
    });

    return () => {
      console.log("disconnecting", username);
      socketServer.disconnect();
    };
  }, [username, dispatch]);

  useEffect(() => {
    if (!socket) {
      return;
    }

    if (gameStatus === "winner") {
      socket.emit("winner", winnerId);
    }

    if (gameStatus === "matchNull") {
      socket.emit("matchNull");
    }
  }, [socket, winnerId, gameStatus]);

  if (!socket) {
    return null;
  }

  return (
    <SocketContext.Provider value={socket}>
      <styles.StyledMain>
        {gameStatus === "waiting" ? <Waiting /> : <Board />}
        <Chat />
      </styles.StyledMain>
    </SocketContext.Provider>
  );
};

export default Game;
