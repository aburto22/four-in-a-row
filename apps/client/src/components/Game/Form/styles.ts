import styled, { css } from "styled-components";
import { colors } from "@styles/cssVariables";

export const Form = styled.form`
  display: flex;
`;

export const Input = styled.input`
  padding: 0.5rem;
  background-color: ${colors.snow};
  border-radius: 0.3rem 0 0 0.3rem;
  height: 2.4rem;
  width: 100%;
  font-size: 0.9rem;
`;

export const Button = styled.button`
  padding: 0.5rem;
  background-color: ${colors.cinereous};
  color: ${colors.snow};
  border-radius: 0 0.3rem 0.3rem 0;
  width: 20%;
  max-width: 4.5rem;

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.7;
    `}
`;
