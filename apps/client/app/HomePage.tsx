"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch } from "@hooks/redux";
import { setUserName } from "@slices/user";
import * as styles from "./HomePage.styles";

const Home = () => {
  const [username, setUsername] = useState("");
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(setUserName(username));
    setUsername("");
    push("/game");
  };

  return (
    <styles.StyledMain>
      <styles.Text>
        To start playing, choose a username and click start.
      </styles.Text>
      <styles.StyledForm onSubmit={handleSubmit}>
        <styles.StyledLabel htmlFor="username">
          Username:
          <styles.StyledInput
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </styles.StyledLabel>
        <styles.StyledButton type="submit">Start!</styles.StyledButton>
      </styles.StyledForm>
    </styles.StyledMain>
  );
};

export default Home;
