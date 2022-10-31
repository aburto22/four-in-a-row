import { colors } from "@styles/cssVariables";
import styled from "styled-components";

export const Footer = styled.footer`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  padding: 1rem;
`;

export const Text = styled.p`
  font-size: 0.8rem;
  color: ${colors.boardBorder};
  font-weight: bold;
`;
