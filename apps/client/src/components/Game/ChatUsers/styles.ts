import { colors } from "@styles/cssVariables";
import styled, { css } from "styled-components";
import type { IToken } from "types/game";

export const Container = styled.div`
  height: 100%;
`;

export const Users = styled.ul`
  height: 100%;
  background-color: ${colors.snow};
  padding: 0.1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

type UserProps = {
  isUser: boolean;
};

export const User = styled.li<UserProps>`
  display: flex;
  gap: 0.3rem;
  align-items: center;
  padding: 0.3rem;

  ${({ isUser }) =>
    isUser
      ? css`
          order: 0;
          background-color: ${colors.blueDark};
          color: ${colors.snow};
        `
      : css`
          order: 1;

          span {
            border-color: ${colors.blueDark};
          }
        `}
`;

export const Info = styled.div`
  display: flex;
  gap: 0.2rem;
  margin-left: auto;
`;

export const Playing = styled.span`
  border-radius: 0.6rem;
  background-color: ${colors.yellowOrange};
  height: 1.2rem;
  font-size: 0.7rem;
  color: ${colors.blueDark};
  border: 1px solid ${colors.snow};
  padding: 0 0.3rem;
`;

type ColorProps = {
  token: IToken;
};

export const Color = styled.span<ColorProps>`
  border-radius: 50%;
  background-color: ${({ token }) => token};
  height: 1.2rem;
  width: 1.2rem;
  border: 1px solid ${colors.snow};
`;
