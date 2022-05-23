/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { resetGame } from '../../slices/game';
import Column from './Column';
import styles from './styles.module.scss';

const Board = () => {
  const { player, board, message } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  const Columns = board.map((c, i) => <Column key={i} column={c} index={i} />);

  const handleReset = () => {
    dispatch(resetGame());
  };

  return (
    <div className={styles.container}>
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
