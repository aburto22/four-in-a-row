import React, { useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "@hooks/redux";
import Token from "@components/Game/Token";
import { IColumn } from "@types";
import { useSocketContext } from "@context/SocketContext";
import * as styles from "./styles";
import { clickToken, setToken } from "@slices/placeholderToken";

interface ColumnProps {
  column: IColumn;
  index: number;
}

const Column = ({ column, index }: ColumnProps) => {
  const columnRef = useRef<HTMLButtonElement | null>(null);
  const isColumnClicked = useRef(false);
  const activePlayerId = useAppSelector((state) => state.game.activePlayerId);
  const userId = useAppSelector((state) => state.game.myId);
  const gameStatus = useAppSelector((state) => state.game.status);
  const socket = useSocketContext();
  const chat = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();

  const isPlayerTurn = activePlayerId === userId;

  useEffect(() => {
    const column = columnRef.current;

    const handleMouseEnter = () => {
      // if (!isColumnClicked.current && isPlayerTurn) {
      //   api.start({ opacity: 1, display: "block", y: -48 });
      //   socket.emit("thinkingMove", index);
      // }
      if (chat.status === "playing") {
        const token = chat.users.find((p) => p.id === userId)?.token || null;
        dispatch(setToken({ index, token }));
        // socket.emit("thinkingMove", { index, token });
      }
    };

    const handleMouseLeave = () => {
      // if (!isColumnClicked.current && isPlayerTurn) {
      //   api.start({ opacity: 0, display: "none", y: -48 });
      // }
      if (chat.status === "playing") {
        dispatch(setToken({ index, token: null }));
        socket.emit("thinkingMove", { index, token: null });
      }
    };

    if (column) {
      column.addEventListener("mouseenter", handleMouseEnter);
      column.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (column) {
        column.removeEventListener("mouseenter", handleMouseEnter);
        column.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [isPlayerTurn, index, socket, dispatch, userId, chat.status, chat.users]);

  const handleClick = () => {
    isColumnClicked.current = true;
    dispatch(clickToken());
  };

  const canPlay = column.some((t) => t === null);

  const disabled = !isPlayerTurn || !canPlay || gameStatus !== "playing";

  return (
    <styles.Column
      type="button"
      onClick={handleClick}
      disabled={disabled}
      ref={columnRef}
    >
      {column.map((t, i) => (
        <Token key={i} token={t} />
      ))}
    </styles.Column>
  );
};

export default Column;
