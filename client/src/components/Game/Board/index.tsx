/* eslint-disable react/no-array-index-key */
import React from "react";
import { useAppSelector } from "@hooks/redux";
import Column from "@components/Game/Column";
import * as styles from "./styles";
import { useSocketContext } from "@context/SocketContext";

const Board = () => {
  const { board, message, status } = useAppSelector((state) => state.game);
  const username = useAppSelector((state) => state.user.name);
  const socket = useSocketContext();

  const Columns = board.map((c, i) => <Column key={i} column={c} index={i} />);

  const handleReset = () => {
    socket.emit("resetGame");
  };

  const buttonDisabled = status !== "winner" && status !== "matchNull";

  return (
    <styles.Container>
      {username && <h1>{`You are: ${username}`}</h1>}
      <p>{message}</p>
      <styles.Board>{Columns}</styles.Board>
      <styles.Button
        type="button"
        onClick={handleReset}
        disabled={buttonDisabled}
      >
        Play again
      </styles.Button>
    </styles.Container>
  );
};

export default Board;
