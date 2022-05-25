import React, { useEffect, useState } from 'react';
import { IMessage } from '../../../types';
import { formatTime } from '../../../lib/chat';
import styles from './styles.module.scss';

interface MessageProps {
  message: IMessage;
}

const Message = ({ message }: MessageProps) => {
  const [formattedTime, setFormattedTime] = useState(formatTime(message.time));

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = formatTime(message.time);

      if (newTime !== formattedTime) {
        setFormattedTime(newTime);
      }
    }, 60 * 1000);

    return () => { clearInterval(timer); };
  }, [formattedTime]);

  return (
    <div className={styles.message}>
      <p>{message.user}</p>
      <p>{formattedTime}</p>
      <p>{message.text}</p>
    </div>
  );
};

export default Message;
