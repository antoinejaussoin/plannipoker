import React, { Component } from 'react';
import styled from 'styled-components';
import Card from './Components/Card';
import io from 'socket.io-client';
import { RECEIVE_SELECTION, SEND_SELECTION, JOIN_SESSION } from './actions';

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 30px;

  > * {
    margin-right: 20px;
    margin-bottom: 20px;
  }
`;

const Page = styled.div`
  display: flex;
  flex-direction: column;
`;

const Deck = styled.div`
  margin: 20px;
`;

const Selection = styled.div`
  margin: 20px;
  min-height: 200px;
`;

class App extends Component {
  state = { cards: [], selection: [] };
  socket = null;

  componentDidMount() {
    fetch('/api/cards')
      .then(response => response.json())
      .then(cards => this.setState({ cards }));

    this.socket = io();
    this.socket.on('disconnect', () => {
      console.warn('Server disconnected');
      this.setState({
        selection: []
      });
    });
    this.socket.emit(JOIN_SESSION, {
      roomId: this.getSessionId(),
    });
    this.socket.on(RECEIVE_SELECTION, payload => {
      this.setState({
        selection: payload
      });
    });
  }

  selectCard = (card) => {
    this.setState({
      selection: [
        ...this.state.selection,
        card
      ]
    }, this.sendSelection);
  }

  sendSelection() {
    this.socket.emit(SEND_SELECTION, {
      roomId: this.getSessionId(),
      payload: this.state.selection
    });
  }

  getSessionId() {
    return window.location.pathname.replace('/games/', '') || '';
  }

  render() {
    return (
      <Page>
        <Selection>
          <h1>Room {this.getSessionId()}</h1>
          <h1>Your selection:</h1>
          <CardsContainer>
            { this.state.selection.map((card, index) =>
              <Card
                key={index}
                color={card.color}>{card.label}</Card>) }
          </CardsContainer>
        </Selection>
        <Deck>
          <h1>Your deck:</h1>
          <CardsContainer>
            { this.state.cards.map(card => 
              <Card
                key={card.label}
                color={card.color}
                onClick={() => this.selectCard(card)}>{card.label}</Card>) }
          </CardsContainer>
        </Deck>
      </Page>
    );
  }
}

export default App;
