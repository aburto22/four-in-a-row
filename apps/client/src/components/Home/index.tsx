import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch } from "@hooks/redux";
import { setUserName } from "@slices/user";
import * as styles from "./styles";

const Home = () => {
  const [username, setUsername] = useState("");
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 10) {
      return;
    }
    setUsername(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(setUserName(username));
    setUsername("");
    push("/game");
  };

  return (
    <styles.StyledMain>
      <styles.Text>
        To start playing, choose an username and click start.
      </styles.Text>
      <styles.StyledForm onSubmit={handleSubmit}>
        <styles.StyledLabel htmlFor="username">
          Username:
          <styles.StyledInput
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            maxLength={10}
            required
          />
        </styles.StyledLabel>
        <styles.StyledButton type="submit">Start!</styles.StyledButton>
      </styles.StyledForm>
    </styles.StyledMain>
  );
};

export default Home;
