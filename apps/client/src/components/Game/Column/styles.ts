import { colors } from "@styles/cssVariables";
import styled, { css } from "styled-components";

export const PlaceholderToken = styled.span`
  display: none;
  position: absolute;
  bottom: calc(100% + 0.5rem);
`;

interface ColumnProps {
  disabled?: boolean;
}

export const Column = styled.button<ColumnProps>`
  position: relative;
  padding: 0.1rem 0.3rem;
  border: 1px solid black;
  display: flex;
  flex-direction: column-reverse;
  cursor: pointer;

  :hover {
    background-color: ${colors.boardHover};

    ${PlaceholderToken} {
      display: block;
    }
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
