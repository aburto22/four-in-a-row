import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Game from './components/Game';
import styles from './App.module.scss';

const App = () => (
  <div className={styles.app}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/waiting" element={<Game />} />
    </Routes>
  </div>
);

export default App;
