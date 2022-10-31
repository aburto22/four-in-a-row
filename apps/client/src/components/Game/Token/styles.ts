import styled from "styled-components";
import { colors } from "@styles/cssVariables";

interface TokenProps {
  colour: "black" | "red" | null;
}

export const Token = styled.div<TokenProps>`
  width: 2rem;
  height: 2rem;
  border: 1px solid black;
  border-radius: 50%;
  margin: 0.3rem 0;
  background-color: ${({ colour }) => {
    if (colour === "red") {
      return colors.tokenRed;
    }
    if (colour === "black") {
      return colors.tokenBlack;
    }
    return colors.snow;
  }};
`;
