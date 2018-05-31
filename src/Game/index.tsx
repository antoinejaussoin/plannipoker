import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import { withTheme, withStyles, WithTheme, Hidden } from '@material-ui/core';
import { Breakpoints } from '@material-ui/core/styles/createBreakpoints';
import Card from '../Components/Card';
import Store from '../store';
import Drawer from './drawer';
import Story from './story';
import Deck from './deck';

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

interface MainProps {
  breakpoints: Breakpoints;
}

const Main = styled<MainProps, 'main'>('main')`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: calc(100vh - 80px);
  ${props => props.breakpoints.up('md')} {
    margin-right: 300px;
  };
`;

const Stories = styled.div`
  flex: 1;
`;

const Selection = styled.div`
  margin: 20px;
  min-height: 200px;
`;

const Title = styled.h1`
  font-size: 2em;
  font-weight: 100;

  @media (max-height: 600px) {
    display: none;
  }
`;

export interface RouteProps {
  gameId: string;
}

export interface GameProps extends RouteComponentProps<RouteProps> {
  store?: Store;
}

@inject('store')
@observer
class Game extends Component<GameProps & WithTheme> {
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
    const { store, theme } = this.props;
    const { username, cards, game } = store;
    return (
      <Page>
        <Main breakpoints={theme.breakpoints}>
          <Title>Game {this.getSessionId()}</Title>
          <Stories>
          { store.currentStory && <Story story={store.currentStory} /> }
          </Stories>
          <Deck cards={cards} onSelect={card => store.vote(card)} />
        </Main>
        <Drawer open={store.drawerOpen} onToggle={store.toggleDrawer} />
      </Page>
    );
  }
}

export default withTheme()(Game);
