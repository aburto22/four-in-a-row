import React from 'react';
import Board from './components/Board';
import './socket';
import styles from './App.module.scss';

const App = () => (
  <div className={styles.app}>
    <h1>I am the app</h1>
    <Board />
  </div>
);

export default App;
