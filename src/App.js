import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Home from './home';
import Game from './game';

const Page = styled.div`

`;

const Header = styled.header`
  display: flex;
  align-items: center;
  height: 100px;
  background-color: #AD1457;
  font-size: 2em;
  color: white;
  padding-left: 50px;
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
        <Header>Plannipoker</Header>
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
