import React from 'react';
import styles from './styles.module.scss';
import { IToken } from '../../../types';

interface TokenProps {
  token: IToken | null;
}

const Token = ({ token }: TokenProps) => (
  <div className={`${styles.token} ${token === 1 && styles.tokenP1} ${token === 2 && styles.tokenP2}`} />
);

export default Token;
