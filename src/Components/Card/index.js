import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 100px;
  height: 150px;
  border: 3px solid ${props => props.color};
  border-radius: 15px;
  justify-content: space-around;
  font-size: 5em;
  color: ${props => props.color};
  cursor: pointer;
`;

const Content = styled.div`
  align-self: center;
`;

const Card = ({ children, color = '#ff867c', onClick }) => (
  <Container color={color} onClick={onClick}>
    <Content>
      {children}
    </Content>
  </Container>
);

export default Card;
