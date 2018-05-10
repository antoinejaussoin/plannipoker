import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Header from './header';
import Home from '../Home';
import Game from '../Game';

const Page = styled.div`

`;

const Footer = styled.footer`

`;

const Main = styled.main`
  margin: 50px;
`;

class App extends Component {
  render() {
    return (
      <Page>
        <Header />
        <Main>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/games/:gameId" component={Game} />
          </Switch>
        </Main>
        <Footer />
      </Page>
    );
  }
}

export default App;
