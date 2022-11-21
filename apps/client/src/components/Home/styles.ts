import styled from "styled-components";
import { colors } from "@styles/cssVariables";

export const StyledMain = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  padding: 1rem;
`;

export const Text = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: ${colors.blueDark};
`;

export const StyledForm = styled.form`
  max-width: 100%;
  width: 30rem;
  padding: 1rem 1.5rem;
  background-color: ${colors.blueDark};
  height: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${colors.snow};
  border-radius: 0.5rem;
`;

export const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  max-width: 100%;
`;

export const StyledInput = styled.input`
  width: 20rem;
  max-width: 100%;
  padding: 0.4rem 0.5rem;
  margin-top: 0.3rem;
  border-radius: 0.2rem;
`;

export const StyledButton = styled.button`
  background-color: ${colors.snow};
  color: ${colors.blueDark};
  border-radius: 0.5rem;
  padding: 0.5rem 1.5rem;
  font-weight: semi-bold;
  transition: transform 200ms;

  :hover {
    transform: scale(1.1);
  }

  :disabled {
    transform: unset;
    opacity: 0.8;
    cursor: default;
  }
`;
