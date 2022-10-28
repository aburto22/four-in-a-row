import React, { useEffect, useRef } from "react";
import { IMessage } from "@types";
import { formatTime } from "@lib/chat";
import * as styles from "./styles";

interface MessageProps {
  message: IMessage;
  currentTime: Date;
}

const Message = ({ message, currentTime }: MessageProps) => {
  const formmatedTimeRef = useRef(formatTime(message.time, currentTime));

  useEffect(() => {
    formmatedTimeRef.current = formatTime(message.time, new Date());
  }, [message.time]);

  return (
    <styles.Div>
      <styles.PUser>{message.user}</styles.PUser>
      <styles.PTime>{formmatedTimeRef.current}</styles.PTime>
      <styles.PText>{message.text}</styles.PText>
    </styles.Div>
  );
};

export default Message;
