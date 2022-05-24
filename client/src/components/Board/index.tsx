/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import socket from '../../socket';
import Column from './Column';
import styles from './styles.module.scss';

const Board = () => {
  const { player, board, message } = useAppSelector((state) => state.game);
  const user = useAppSelector((state) => state.user);

  const Columns = board.map((c, i) => <Column key={i} column={c} index={i} />);

  const handleReset = () => {
    socket.emit('resetGame');
  };

  return (
    <div className={styles.container}>
      {user && <h1>{`You are: ${user.name}`}</h1>}
      <h2 className={styles.title}>{`Player number ${player} is playing`}</h2>
      <p className={styles.message}>{message}</p>
      <div className={styles.board}>
        {Columns}
      </div>
      <button className={styles.resetButton} type="button" onClick={handleReset}>
        Reset game
      </button>
    </div>
  );
};

export default Board;
