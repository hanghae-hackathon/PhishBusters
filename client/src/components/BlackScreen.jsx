import React from 'react';
import styled from 'styled-components';

const BlackScreen = () => {
  return <Screen></Screen>;
};

export default BlackScreen;

const Screen = styled.div`
  background-color: rgba(0, 0, 0, 1);
  width: 6rem;
  height: 2rem;

  border-top-right-radius: 40%;
  border-bottom-right-radius: 40%;

  border-top-left-radius: 40%;
  border-bottom-left-radius: 40%;

  margin: 0 auto;
  margin-top: 2vh;
`;
