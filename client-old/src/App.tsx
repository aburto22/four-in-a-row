import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Game from "./components/Game";
import PrivateRoute from "./components/PrivateRoute";
import { StyledDiv } from "./App.styles";

const App = () => (
  <StyledDiv>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/waiting"
        element={
          <PrivateRoute>
            <Game />
          </PrivateRoute>
        }
      />
    </Routes>
  </StyledDiv>
);

export default App;
