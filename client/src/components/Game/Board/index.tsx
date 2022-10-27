/* eslint-disable react/no-array-index-key */
import React from "react";
import { useAppSelector } from "@hooks/redux";
import Column from "@components/Game/Column";
import styles from "./styles.module.scss";
import { useSocketContext } from "@context/SocketContext";

const Board = () => {
  const { board, message, status } = useAppSelector((state) => state.game);
  const user = useAppSelector((state) => state.user);
  const socket = useSocketContext();

  const Columns = board.map((c, i) => <Column key={i} column={c} index={i} />);

  const handleReset = () => {
    socket.emit("resetGame");
  };

  const buttonDisabled = status !== "winner" && status !== "matchNull";

  return (
    <div className={styles.container}>
      {user && <h1>{`You are: ${user.name}`}</h1>}
      <p className={styles.title}>{message}</p>
      <div className={styles.board}>{Columns}</div>
      <button
        className={`${styles.resetButton} ${buttonDisabled && styles.disabled}`}
        type="button"
        onClick={handleReset}
        disabled={buttonDisabled}
      >
        Play again
      </button>
    </div>
  );
};

export default Board;
