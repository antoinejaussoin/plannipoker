import React, { Component } from 'react';
import styled from 'styled-components';
import Card from './Components/Card';
import UserList from './Components/UserList';
import Input from './Components/Input';
import io from 'socket.io-client';
import { RECEIVE_SELECTION, SEND_SELECTION, JOIN_SESSION, RENAME_USER, RECEIVE_PLAYER_LIST } from './actions';

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
`;

const Aside = styled.aside`
  width: 300px;
  border-right: 1px solid grey;
`;

const Main = styled.main`
  flex: 1;
`;

const Deck = styled.div`
  margin: 20px;
`;

const Selection = styled.div`
  margin: 20px;
  min-height: 200px;
`;

class Game extends Component {
  state = { cards: [], selection: [], name: 'Player Unknown', players: [] };
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
    this.socket.on(RECEIVE_PLAYER_LIST, payload => {
      this.setState({
        players: payload
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
    return this.props.match.params.gameId;
  }

  onNameChange = (e) => {
    const value = e.target.value;
    this.setState({
      name: value
    });
    this.socket.emit(RENAME_USER, {
      roomId: this.getSessionId(),
      payload: value
    });
  }

  render() {
    const { name, selection, cards, players } = this.state;
    return (
      <Page>
        <Aside>
          <Input value={name} onChange={this.onNameChange} />
          <UserList users={players} />
        </Aside>
        <Main>
          <Selection>
            <h1>Room {this.getSessionId()}</h1>
            <h1>Your selection:</h1>
            <CardsContainer>
              { selection.map((card, index) =>
                <Card
                  key={index}
                  color={card.color}>{card.label}</Card>) }
            </CardsContainer>
          </Selection>
          <Deck>
            <h1>Your deck:</h1>
            <CardsContainer>
              { cards.map(card => 
                <Card
                  key={card.label}
                  color={card.color}
                  onClick={() => this.selectCard(card)}>{card.label}</Card>) }
            </CardsContainer>
          </Deck>
        </Main>
      </Page>
    );
  }
}

export default Game;
