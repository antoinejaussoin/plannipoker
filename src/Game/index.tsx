import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import Card from '../Components/Card';
import PlayerList from '../Components/UserList';
import Input from '../Components/Input';
import Stories from './stories';
import Store from '../store';

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

export interface RouteProps {
  gameId: string;
}

export interface GameProps extends RouteComponentProps<RouteProps> {
  store?: Store;
}

@inject('store')
@observer
class Game extends Component<GameProps> {
  componentDidMount() {
    this.props.store.connect(this.getSessionId());
  }

  componentWillUnmount() {
    this.props.store.disconnect();
  }

  getSessionId() {
    return this.props.match.params.gameId;
  }

  render() {
    const { store } = this.props;
    const { username, cards, game, currentStory } = store;
    return (
      <Page>
        <Aside>
          <Input
            label="Your name"
            value={username}
            onChange={newName => store.changeUsername(newName)} />
          <PlayerList players={game ? game.players : []} />
        </Aside>
        <Main>
          <Selection>
            <h1>Room {this.getSessionId()}</h1>
            <Stories />
            <h1>Votes:</h1>
            <CardsContainer>
              { currentStory && currentStory.votes.map((vote, index) =>
                <Card
                  key={index}
                  color={vote.card.color}>{vote.card.label}</Card>) }
            </CardsContainer>
          </Selection>
          <Deck>
            <h1>Your deck:</h1>
            <CardsContainer>
              { cards.map(card =>
                <Card
                  key={card.label}
                  color={card.color}
                  onClick={() => store.vote(card)}>{card.label}</Card>) }
            </CardsContainer>
          </Deck>
        </Main>
      </Page>
    );
  }
}

export default Game;
