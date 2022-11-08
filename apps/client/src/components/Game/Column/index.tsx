/* eslint-disable react/no-array-index-key */
import React from "react";
import { useAppSelector } from "@hooks/redux";
import Token from "@components/Game/Token";
import { IColumn } from "@types";
import { useSocketContext } from "@context/SocketContext";
import { useSpring } from "@react-spring/web";
import * as styles from "./styles";

interface ColumnProps {
  column: IColumn;
  index: number;
}

const Column = ({ column, index }: ColumnProps) => {
  const activePlayerId = useAppSelector((state) => state.game.activePlayerId);
  const userId = useAppSelector((state) => state.game.myId);
  const gameStatus = useAppSelector((state) => state.game.status);
  const chat = useAppSelector((state) => state.chat);
  const socket = useSocketContext();

  const props = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    loop: {
      reverse: true,
    },
  });

  const handleClick = () => {
    socket.emit("playToken", index);
  };

  const Tokens = column.map((t, i) => <Token key={i} token={t} />);

  const canPlay = column.some((t) => t === null);

  const isPlayerTurn = activePlayerId === userId;

  const disabled = !isPlayerTurn || !canPlay || gameStatus !== "playing";

  const playerColor =
    chat.status === "playing"
      ? chat.users.find((u) => u.id === userId)?.token
      : undefined;

  const showPlaceholderToken = playerColor && !disabled;

  return (
    <styles.Column type="button" onClick={handleClick} disabled={disabled}>
      {showPlaceholderToken && (
        <styles.PlaceholderToken style={props}>
          <Token token={playerColor} />
        </styles.PlaceholderToken>
      )}
      {Tokens}
    </styles.Column>
  );
};

export default Column;
