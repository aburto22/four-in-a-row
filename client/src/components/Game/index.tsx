import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { setUserId } from "@slices/user";
import { addMessage } from "@slices/chat";
import {
  startGame,
  playToken,
  resetGame,
  quitGame,
  setUserIdInGame,
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
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.game.myId);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketServer = io(socketUrl);

    setSocket(socketServer);

    socketServer.on("assignUserId", (id: string) => {
      dispatch(setUserId(id));
      dispatch(setUserIdInGame(id));
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
      // const gameState = store.getState().game;

      // if (gameState.status === "winner") {
      //   const winnerId = gameState.players.find(
      //     (p) => p.id !== activePlayer
      //   )?.id;
      //   socketServer.emit("winner", winnerId);
      // }

      // if (gameState.status === "matchNull") {
      //   socketServer.emit("matchNull");
      // }
    });

    socketServer.on("resetGame", ({ activePlayer }: IStartGameData) => {
      dispatch(resetGame(activePlayer));
    });

    socketServer.on("quitGame", () => {
      dispatch(quitGame());
    });

    socketServer.on("connect", () => {
      console.log("connecting", username);
      socketServer.emit("setUpPlayer", username);
      socketServer.emit("startGame");
    });

    return () => {
      console.log("disconnecting", username);
      socketServer.disconnect();
    };
  }, [username, dispatch]);

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
