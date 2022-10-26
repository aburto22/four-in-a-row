import React, { useState } from "react";
import { useAppSelector } from "@hooks/redux";
import socket from "@socket";
import * as styles from "./styles";

const Form = () => {
  const [text, setText] = useState("");
  const user = useAppSelector((state) => state.user?.name);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit("message", { user, text });
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
