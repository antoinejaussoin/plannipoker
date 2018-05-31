import React, { SFC } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  color: ${props => props.color};
  cursor: pointer;

  width: 100px;
  height: 150px;
  border: 3px solid ${props => props.color};
  border-radius: 15px;
  font-size: 5em;

  @media (max-width: 600px) {
    width: 33px;
    height: 50px;
    border: 1px solid ${props => props.color};
    border-radius: 5px;
    font-size: 1.5em;
  }
`;

const Content = styled.div`
  align-self: center;
`;

export interface CardProps {
  color: string;
  onClick?: (() => void);
}

const Card: SFC<CardProps> = ({ children, color = '#ff867c', onClick }) => (
  <Container color={color} onClick={onClick}>
    <Content>
      {children}
    </Content>
  </Container>
);

export default Card;
