import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Game from './components/Game';
import PrivateRoute from './components/PrivateRoute';
import { StyledDiv } from './App.styles';

const App = () => (
  <StyledDiv>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/waiting" element={<PrivateRoute><Game /></PrivateRoute>} />
    </Routes>
  </StyledDiv>
);

export default App;
