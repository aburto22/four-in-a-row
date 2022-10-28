import React from "react";
import styles from "./styles.module.scss";
import { IToken } from "@types";

interface TokenProps {
  token: IToken | null;
}

const Token = ({ token }: TokenProps) => (
  <div
    className={`${styles.token} ${token === "red" && styles.red} ${
      token === "blue" && styles.blue
    }`}
  />
);

export default Token;
