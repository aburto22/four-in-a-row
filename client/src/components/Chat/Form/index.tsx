import React, { useState } from 'react';
import { useAppSelector } from '../../../hooks/redux';
import socket from '../../../socket';

const Form = () => {
  const [text, setText] = useState('');
  const user = useAppSelector((state) => state.user?.name);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit('message', ({ user, text }));
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={text}>
        Text:
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </label>
      <button type="submit">Send</button>
    </form>
  );
};

export default Form;
