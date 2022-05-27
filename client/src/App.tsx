import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/waiting"
          element={(
            <>
              <Board />
              <Chat />
            </>
          )}
        />
      </Routes>
    </div>
  );
};

export default App;
