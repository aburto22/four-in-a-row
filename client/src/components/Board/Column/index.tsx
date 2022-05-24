/* eslint-disable react/no-array-index-key */
import React from 'react';
import socket from '../../../socket';
import { useAppSelector } from '../../../hooks/redux';
import Token from '../Token';
import styles from './styles.module.scss';
import { IColumn } from '../../../types';

interface ColumnProps {
  column: IColumn;
  index: number;
}

const Column = ({ column, index }: ColumnProps) => {
  const { active } = useAppSelector((state) => state.game);
  const user = useAppSelector((state) => state.user);

  const handleClick = () => {
    socket.emit('playToken', {
      index,
      userId: user?.id,
    });
  };

  const Tokens = column.map((t, i) => <Token key={i} token={t} />);

  const buttonDisabled = !active;

  return (
    <button type="button" className={styles.column} onClick={handleClick} disabled={buttonDisabled}>
      {Tokens}
    </button>
  );
};

export default Column;
