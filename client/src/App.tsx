import React from 'react';
import Board from './components/Board';
import Chat from './components/Chat';
import './socket';
import styles from './App.module.scss';

const App = () => (
  <div className={styles.app}>
    <Board />
    <Chat />
  </div>
);

export default App;
