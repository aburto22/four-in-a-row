/* eslint-disable react/no-array-index-key */
import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { setToken } from "@slices/placeholderToken";
import Column from "@components/Game/Column";
import * as styles from "./styles";
import { useSocketContext } from "@context/SocketContext";
import PlaceholderToken from "../PlaceholderToken";

const Board = () => {
  const { board, message, status } = useAppSelector((state) => state.game);
  const boardRef = useRef<HTMLDivElement | null>(null);
  const socket = useSocketContext();
  const dispatch = useAppDispatch();
  const chat = useAppSelector((state) => state.chat);
  const { token, index } = useAppSelector((state) => state.placeholderToken);

  useEffect(() => {
    const boardElement = boardRef.current;

    const handleMouseLeave = () => {
      if (chat.status === "playing") {
        dispatch(setToken({ index, token, display: false }));
        socket.emit("thinkingMove", {
          index,
          token,
          display: false,
        });
      }
    };

    if (boardElement) {
      boardElement.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (boardElement) {
        boardElement.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [chat.status, socket, dispatch, index, token]);

  const Columns = board.map((c, i) => <Column key={i} column={c} index={i} />);

  const handleReset = () => {
    socket.emit("resetGame");
  };

  const showButton = status === "winner" || status === "matchNull";

  return (
    <styles.Container>
      <styles.Message>{message}</styles.Message>
      <styles.Board ref={boardRef}>
        <PlaceholderToken />
        {Columns}
      </styles.Board>
      {showButton && (
        <styles.Button
          type="button"
          onClick={handleReset}
          disabled={!showButton}
        >
          Play again
        </styles.Button>
      )}
    </styles.Container>
  );
};

export default Board;
