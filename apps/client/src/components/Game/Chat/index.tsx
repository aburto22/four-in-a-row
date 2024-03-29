import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import Message from "@components/Game/Message";
import { useAppSelector } from "@hooks/redux";
import Form from "@components/Game/Form";
import * as styles from "./styles";

const Chat = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const messages = useAppSelector((state) => state.chat.messages);
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

    return () => {
      clearInterval(timer);
    };
  }, [currentTime]);

  return (
    <styles.Chat>
      <styles.Messages ref={messagesRef}>
        {messages.length > 0 &&
          messages.map((m) => (
            <Message key={m.id} message={m} currentTime={currentTime} />
          ))}
      </styles.Messages>
      <Form />
    </styles.Chat>
  );
};

export default Chat;
