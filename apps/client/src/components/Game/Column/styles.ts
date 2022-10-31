import { colors } from "@styles/cssVariables";
import styled, { css } from "styled-components";

interface ColumnProps {
  disabled?: boolean;
}

export const Column = styled.button<ColumnProps>`
  padding: 0.1rem 0.5rem;
  border: 1px solid black;
  display: flex;
  flex-direction: column-reverse;
  cursor: pointer;

  :hover {
    background-color: ${colors.boardHover};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: default;

      :hover {
        background-color: inherit;
      }
    `}
`;
