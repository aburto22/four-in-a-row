/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import Column from './Column';
import styles from './styles.module.scss';

const Board = () => {
  const { player, board } = useAppSelector((state) => state.game);

  const Columns = board.map((c, i) => <Column key={i} column={c} index={i} />);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{`Player number ${player} is playing`}</h2>
      <div className={styles.board}>
        {Columns}
      </div>
    </div>
  );
};

export default Board;
