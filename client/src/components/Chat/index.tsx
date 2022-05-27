import React from 'react';
import Message from './Message';
import { useAppSelector } from '../../hooks/redux';
import styles from './styles.module.scss';
import Form from './Form';

const Chat = () => {
  const messages = useAppSelector((state) => state.chat);

  return (
    <section className={styles.section}>
      <div className={styles.chat}>
        {messages.length > 0 && messages.map((m) => <Message key={m.id} message={m} />)}
      </div>
      <Form />
    </section>
  );
};

export default Chat;
