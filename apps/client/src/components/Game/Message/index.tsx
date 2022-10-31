import React, { useEffect, useRef } from "react";
import { IMessage } from "@types";
import { formatTime } from "@lib/chat";
import * as styles from "./styles";
import { useAppSelector } from "@hooks/redux";

interface MessageProps {
  message: IMessage;
  currentTime: Date;
}

const Message = ({ message, currentTime }: MessageProps) => {
  const username = useAppSelector((state) => state.user.name);
  const formmatedTimeRef = useRef(formatTime(message.time, currentTime));

  useEffect(() => {
    formmatedTimeRef.current = formatTime(message.time, new Date());
  }, [message.time]);

  const sameUser = username === message.user;

  return (
    <styles.Message sameUser={sameUser}>
      <styles.MessageInfo sameUser={sameUser}>
        <styles.PUser>{message.user}</styles.PUser>
        <styles.PTime>{formmatedTimeRef.current}</styles.PTime>
      </styles.MessageInfo>
      <styles.PText sameUser={sameUser}>{message.text}</styles.PText>
    </styles.Message>
  );
};

export default Message;
