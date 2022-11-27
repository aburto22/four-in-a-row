import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { addMessage, updateUsers } from "@slices/chat";
import { quitGame, setUserId, updateGame } from "@slices/game";
import { setUserId as setUserIdGeneral } from "@slices/user";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import type { ClientToServerEvents, ServerToClientEvents } from "@types";
import SocketContext from "@context/SocketContext";
import Board from "./Board";
import Waiting from "./Waiting";
import Aside from "./Aside";
import * as styles from "./styles";
import { clickToken, setToken } from "@slices/placeholderToken";

const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL;

if (!socketUrl) {
  throw new Error("socket url missing");
}

const Game = () => {
  const username = useAppSelector((state) => state.user.name);
  const gameStatus = useAppSelector((state) => state.game.status);
  const dispatch = useAppDispatch();
  const [socket, setSocket] = useState<Socket<
    ClientToServerEvents,
    ServerToClientEvents
  > | null>(null);

  useEffect(() => {
    const socketServer: Socket<ServerToClientEvents, ClientToServerEvents> =
      io(socketUrl);

    setSocket(socketServer);

    socketServer.on("assignUserId", (userId) => {
      dispatch(setUserId(userId));
      dispatch(setUserIdGeneral(userId));
    });

    socketServer.on("updateChatUsers", (users) => {
      dispatch(updateUsers(users));
    });

    socketServer.on("message", (message) => dispatch(addMessage(message)));

    socketServer.on("start", (game) => {
      dispatch(updateGame(game));
    });

    socketServer.on("play", (game) => {
      dispatch(clickToken(game));
    });

    socketServer.on("thinkingMove", (data) => {
      dispatch(setToken(data));
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
      <Aside />
      <styles.Main>
        {gameStatus === "waiting" ? <Waiting /> : <Board />}
      </styles.Main>
    </SocketContext.Provider>
  );
};

export default Game;
