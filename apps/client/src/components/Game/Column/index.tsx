import React, { useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "@hooks/redux";
import Token from "@components/Game/Token";
import { IColumn } from "@types";
import { useSocketContext } from "@context/SocketContext";
import * as styles from "./styles";
import { setToken } from "@slices/placeholderToken";

interface ColumnProps {
  column: IColumn;
  index: number;
}

const Column = ({ column, index }: ColumnProps) => {
  const columnRef = useRef<HTMLButtonElement | null>(null);
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
      if (chat.status === "playing") {
        const token = chat.users.find((p) => p.id === userId)?.token || null;
        dispatch(setToken({ index, token, display: true }));
        socket.emit("thinkingMove", {
          index,
          token,
          display: true,
        });
      }
    };

    const handleMouseLeave = () => {
      if (chat.status === "playing") {
        const token = chat.users.find((p) => p.id === userId)?.token || null;
        dispatch(setToken({ index, token, display: false }));
        socket.emit("thinkingMove", {
          index,
          token,
          display: false,
        });
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
    socket.emit("playToken", index);
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
