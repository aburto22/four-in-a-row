/* eslint-disable react/no-array-index-key */
import React from "react";
import { useAppSelector } from "@hooks/redux";
import Column from "@components/Game/Column";
import * as styles from "./styles";
import { useSocketContext } from "@context/SocketContext";
import PlaceholderToken from "../PlaceholderToken";

const Board = () => {
  const { board, message, status } = useAppSelector((state) => state.game);
  const socket = useSocketContext();

  const Columns = board.map((c, i) => <Column key={i} column={c} index={i} />);

  const handleReset = () => {
    socket.emit("resetGame");
  };

  const showButton = status === "winner" || status === "matchNull";

  return (
    <styles.Container>
      <styles.Message>{message}</styles.Message>
      <styles.Board>
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
