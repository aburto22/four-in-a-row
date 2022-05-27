import React, { useEffect } from 'react';
import { IMessage } from '../../../types';
import { formatTime } from '../../../lib/chat';
import * as styles from './styles';

interface MessageProps {
  message: IMessage;
  currentTime: Date;
}

const Message = ({ message, currentTime }: MessageProps) => {
  let formattedTime = formatTime(message.time, currentTime);

  useEffect(() => {
    formattedTime = formatTime(message.time, new Date());
  }, []);

  return (
    <styles.Div>
      <styles.PUser>{message.user}</styles.PUser>
      <styles.PTime>{formattedTime}</styles.PTime>
      <styles.PText>{message.text}</styles.PText>
    </styles.Div>
  );
};

export default Message;
