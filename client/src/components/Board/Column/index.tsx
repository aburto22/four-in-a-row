/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useAppDispatch } from '../../../hooks/redux';
import { playToken } from '../../../slices/game';
import Token from '../Token';
import styles from './styles.module.scss';
import { IColumn } from '../../../types';

interface ColumnProps {
  column: IColumn;
  index: number;
}

const Column = ({ column, index }: ColumnProps) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(playToken(index));
  };

  const Tokens = column.map((t, i) => <Token key={i} token={t} />);

  return (
    <button type="button" className={styles.column} onClick={handleClick}>
      {Tokens}
    </button>
  );
};

export default Column;
