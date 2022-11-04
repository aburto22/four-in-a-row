import React, { useState } from "react";
import { useSocketContext } from "@context/SocketContext";
import * as styles from "./styles";

const Form = () => {
  const [text, setText] = useState("");
  const socket = useSocketContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!text) {
      return;
    }

    socket.emit("message", text);
    setText("");
  };

  const disabled = !text;

  return (
    <styles.Form onSubmit={handleSubmit}>
      <styles.Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <styles.Button type="submit" disabled={disabled}>Send</styles.Button>
    </styles.Form>
  );
};

export default Form;
