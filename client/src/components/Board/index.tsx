import React from 'react';
import styles from './styles.module.scss';

const Board = () => {
  console.log('I am board');

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>I am the board</h1>
      <div className={styles.board} />
    </div>
  );
};

export default Board;
