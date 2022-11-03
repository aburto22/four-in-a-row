import React, { useState } from "react";
import { useSocketContext } from "@context/SocketContext";
import * as styles from "./styles";

const Form = () => {
  const [text, setText] = useState("");
  const socket = useSocketContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit("message", text);
    setText("");
  };

  return (
    <styles.Form onSubmit={handleSubmit}>
      <styles.Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <styles.Button type="submit">Send</styles.Button>
    </styles.Form>
  );
};

export default Form;
