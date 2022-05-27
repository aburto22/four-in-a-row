import React, { useEffect } from 'react';
import { useAppSelector } from '../../hooks/redux';
import socket from '../../socket';
import Board from './Board';
import Chat from './Chat';

const Game = () => {
  const username = useAppSelector((state) => state.user.name);

  useEffect(() => {
    socket.emit('setUpPlayer', username);

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <Board />
      <Chat />
    </>
  );
};

export default Game;
