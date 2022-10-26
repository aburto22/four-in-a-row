import styled from 'styled-components';
import { colors } from '../../../cssVariables';

export const Section = styled.section`
  background-color: ${colors.blueDark};
  padding: 0.7rem;
  color: ${colors.snow};
  max-width: 40rem;
  margin: 0 auto;
`;

export const Div = styled.div`
  background-color: ${colors.snow};
  color: ${colors.blueDark};
  height: 17rem;
  overflow: auto;
  padding: 0.5rem;
  margin-bottom: 0.7rem;
`;
