/* eslint-disable react/no-array-index-key */
import React from "react";
import { useAppSelector } from "@hooks/redux";
import Token from "@components/Game/Token";
import { IColumn } from "@types";
import { useSocketContext } from "@context/SocketContext";
import * as styles from "./styles";

interface ColumnProps {
  column: IColumn;
  index: number;
}

const Column = ({ column, index }: ColumnProps) => {
  const isPlayerTurn = useAppSelector((state) => state.game.isPlayerTurn);
  const gameStatus = useAppSelector((state) => state.game.status);
  const socket = useSocketContext();

  const handleClick = () => {
    socket.emit("playToken", index);
  };

  const Tokens = column.map((t, i) => <Token key={i} token={t} />);

  const canPlay = column.some((t) => t === null);

  const disabled = !isPlayerTurn || !canPlay || gameStatus !== "playing";

  return (
    <styles.Column type="button" onClick={handleClick} disabled={disabled}>
      {Tokens}
    </styles.Column>
  );
};

export default Column;
