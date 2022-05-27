/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useAppSelector } from '../../../hooks/redux';
import socket from '../../../socket';
import Column from '../Column';
import styles from './styles.module.scss';

const Board = () => {
  const { board, message, players } = useAppSelector((state) => state.game);
  const user = useAppSelector((state) => state.user);

  const Columns = board.map((c, i) => <Column key={i} column={c} index={i} />);

  const handleReset = () => {
    socket.emit('resetGame');
  };

  const buttonDisabled = players.length < 2;

  return (
    <div className={styles.container}>
      {user && <h1>{`You are: ${user.name}`}</h1>}
      <p className={styles.title}>{message}</p>
      <div className={styles.board}>
        {Columns}
      </div>
      <button
        className={`${styles.resetButton} ${buttonDisabled && styles.disabled}`}
        type="button"
        onClick={handleReset}
        disabled={buttonDisabled}
      >
        Reset game
      </button>
    </div>
  );
};

export default Board;
