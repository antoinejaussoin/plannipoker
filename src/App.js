import React, { Component } from 'react';
import styled from 'styled-components';
import Card from './Components/Card';

const Container = styled.div`
  display: flex;
  margin: 30px;

  > * {
    margin-right: 20px;
  }
`;

class App extends Component {
  state = { cards: [] };

  componentDidMount() {
    fetch('/api/cards')
      .then(response => response.json())
      .then(cards => this.setState({ cards }));
  }
  render() {
    return (
      <Container>
        { this.state.cards.map(card => <Card color={card.color}>{card.label}</Card>) }
      </Container>
    );
  }
}

export default App;
