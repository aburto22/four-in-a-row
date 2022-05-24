import React from 'react';
import Board from './components/Board';
import './socket';
import styles from './App.module.scss';

const App = () => (
  <div className={styles.app}>
    <Board />
  </div>
);

export default App;
