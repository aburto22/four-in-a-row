import React, {
  useRef, useLayoutEffect, useState, useEffect,
} from 'react';
import Message from '../Message';
import { useAppSelector } from '../../../hooks/redux';
import Form from '../Form';
import * as styles from './styles';

const Chat = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const messages = useAppSelector((state) => state.chat);
  const messagesRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!messagesRef.current) {
      return;
    }

    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 30 * 1000);

    return () => { clearInterval(timer); };
  }, [currentTime]);

  return (
    <styles.Section>
      <styles.Div ref={messagesRef}>
        {messages.length > 0 && messages
          .map((m) => <Message key={m.id} message={m} currentTime={currentTime} />)}
      </styles.Div>
      <Form />
    </styles.Section>
  );
};

export default Chat;
