import React from 'react';
import { IMessage } from '../../../types';
import styles from './styles.module.scss';

interface MessageProps {
  message: IMessage;
}

const Message = ({ message }: MessageProps) => (
  <div className={styles.message}>
    <p>{message.text}</p>
  </div>
);

export default Message;
