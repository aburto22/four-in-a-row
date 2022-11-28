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
  const { token, index, isClicked } = useAppSelector(
    (state) => state.placeholderToken
  );
  const isPlayerTurn = useAppSelector(
    (state) => state.game.myId === state.game.activePlayerId
  );

  const shouldEmitEvent =
    chat.status === "playing" && isPlayerTurn && !isClicked;

  useEffect(() => {
    const boardElement = boardRef.current;

    const handleMouseLeave = () => {
      if (shouldEmitEvent) {
        console.log("running");
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
  }, [socket, dispatch, index, token, shouldEmitEvent]);

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
