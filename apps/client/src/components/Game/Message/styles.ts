import styled, { css } from "styled-components";
import { colors } from "@styles/cssVariables";

interface MessageProps {
  sameUser: boolean;
}

export const Message = styled.div<MessageProps>`
  display: flex;
  flex-wrap: wrap;

  ${({ sameUser }) =>
    sameUser &&
    css`
      flex-direction: row-reverse;
    `}
`;

interface MessageInfoProps {
  sameUser: boolean;
}

export const MessageInfo = styled.div<MessageInfoProps>`
  display: flex;
  gap: 0.5rem;

  ${({ sameUser }) =>
    sameUser &&
    css`
      flex-direction: row-reverse;
    `}
`;

export const PUser = styled.p`
  font-size: 0.8rem;
  font-weight: bold;
`;

export const PTime = styled.p`
  font-size: 0.8rem;
  font-weight: bold;
  color: ${colors.cinereous};
`;

interface PTextProps {
  sameUser: boolean;
}

export const PText = styled.p<PTextProps>`
  width: 100%;
  font-size: 0.9rem;

  ${({ sameUser }) =>
    sameUser &&
    css`
      text-align: right;
    `}
`;
