import styled from "styled-components";
import { colors, dimensions } from "@styles/cssVariables";

type AsideProps = {
  isExpanded: boolean;
};

export const Aside = styled.aside<AsideProps>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: ${dimensions.asideWidth};
  background-color: ${colors.blueDark};
  display: grid;
  grid-template-rows: 10rem 1fr;
  padding: 1rem;
  gap: 1rem;
  transition: transform 300ms;
  transform: translateX(${({ isExpanded }) => (isExpanded ? "0 " : "-100%")});

  @media (min-width: ${dimensions.breakpoint}) {
    transform: unset;
  }
`;

export const Button = styled.button`
  position: fixed;
  top: 8rem;
  left: ${dimensions.asideWidth};
  padding: 0.5rem 0.5rem 0.5rem 0.1rem;
  background-color: ${colors.blueDark};
  border-radius: 0 0.5rem 0.5rem 0;
  color: ${colors.snow};
  display: flex;
  align-items: center;

  @media (min-width: ${dimensions.breakpoint}) {
    display: none;
  }
`;
