import React from "react";
import * as styles from "./styles";
import { IToken } from "@types";

interface TokenProps {
  token: IToken | null;
}

const Token = ({ token }: TokenProps) => <styles.Token colour={token} />;

export default Token;
