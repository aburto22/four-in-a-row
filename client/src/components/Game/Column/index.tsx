/* eslint-disable react/no-array-index-key */
import React from "react";
import { useAppSelector } from "@hooks/redux";
import Token from "@components/Game/Token";
import styles from "./styles.module.scss";
import { IColumn } from "@types";
import { useSocketContext } from "@context/SocketContext";

interface ColumnProps {
  column: IColumn;
  index: number;
}

const Column = ({ column, index }: ColumnProps) => {
  const isPlayerTurn = useAppSelector((state) => state.game.isPlayerTurn);
  const userId = useAppSelector((state) => state.game.myId);
  const socket = useSocketContext();

  const handleClick = () => {
    socket.emit("playToken", {
      index,
      userId,
    });
  };

  const Tokens = column.map((t, i) => <Token key={i} token={t} />);

  const canPlay = column.some((t) => t === null);

  const buttonDisabled = !isPlayerTurn || !canPlay;

  return (
    <button
      type="button"
      className={`${styles.column} ${!buttonDisabled && styles.columnActive}`}
      onClick={handleClick}
      disabled={buttonDisabled}
    >
      {Tokens}
    </button>
  );
};

export default Column;
