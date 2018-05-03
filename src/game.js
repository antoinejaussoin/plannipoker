import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import Card from './Components/Card';
import UserList from './Components/UserList';
import Input from './Components/Input';

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

@inject('store')
@observer
class Game extends Component {
  componentDidMount() {
    this.props.store.connect(this.getSessionId());
  }

  componentWillUnmount() {
    this.props.store.disconnect();
  }

  selectCard = (card) => {
    this.props.store.selectCard(card);
  }

  getSessionId() {
    return this.props.match.params.gameId;
  }

  onNameChange = (e) => {
    const value = e.target.value;
    this.props.store.changeUsername(value);
  }

  render() {
    const { username, selection, cards, players } = this.props.store;
    return (
      <Page>
        <Aside>
          <Input value={username} onChange={this.onNameChange} />
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
