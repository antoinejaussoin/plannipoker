import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import Card from '../Components/Card';
import Store from '../store';
import Drawer from './drawer';
import Story from './story';

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

const Title = styled.h1`
  font-size: 2em;
  font-weight: 100;
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
    const { username, cards, game } = store;
    return (
      <Page>
        <Main>
          <Selection>
            <Title>Room {this.getSessionId()}</Title>
            { store.currentStory && <Story story={store.currentStory} /> }
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
        <Drawer />
      </Page>
    );
  }
}

export default Game;
