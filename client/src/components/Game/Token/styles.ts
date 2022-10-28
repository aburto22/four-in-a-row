import styled, { css } from "styled-components";

interface TokenProps {
  colour: string | null;
}

export const Token = styled.div<TokenProps>`
  width: 2rem;
  height: 2rem;
  border: 1px solid black;
  border-radius: 50%;
  margin: 0.3rem 0;
  background-color: ${({ colour }) => colour || "inherit"};
`;
