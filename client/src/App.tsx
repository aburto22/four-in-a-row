import React, { useEffect } from 'react';
import Board from './components/Board';
import Chat from './components/Chat';
import io from './socket';
import styles from './App.module.scss';

const App = () => {
  useEffect(() => () => {
    io.disconnect();
  }, []);

  return (
    <div className={styles.app}>
      <Board />
      <Chat />
    </div>
  );
};

export default App;
