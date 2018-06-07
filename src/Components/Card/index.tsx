import React, { SFC } from 'react';
import styled from 'styled-components';
import { colors } from '@material-ui/core';

const faceDownColor = colors.orange['400'];

interface ContainerProps {
  color: string;
  faceDown: boolean;
}

const Container = styled<ContainerProps, 'div'>('div')`
  display: flex;
  justify-content: space-around;
  color: ${props => props.color};
  cursor: pointer;

  width: 100px;
  height: 150px;
  border-color: ${props => props.color};
  border-width: 3px;
  border-style: solid;
  border-radius: 15px;
  font-size: 5em;

  @media (max-width: 600px) {
    width: 33px;
    height: 50px;
    border-width: 1px;
    border-radius: 5px;
    font-size: 1.5em;
  }

  ${props => props.faceDown ? `
  border-color: ${faceDownColor};
  background: repeating-linear-gradient(
    45deg,
    #fff,
    #fff 3px,
    ${faceDownColor} 4px,
    ${faceDownColor} 5px
  );
  `:  ''}
`;

const Content = styled.div`
  align-self: center;
`;

export interface CardProps {
  color: string;
  onClick?: (() => void);
  faceDown?: boolean;
}

const Card: SFC<CardProps> = ({ children, color = '#ff867c', onClick, faceDown = false }) => (
  <Container color={color} onClick={onClick} faceDown={faceDown}>
    <Content>
      {!faceDown ? children : ''}
    </Content>
  </Container>
);

export default Card;
