import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
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
    const { history } = this.props;
    return (
      <Page>
        <Header onClick={() => history.push('/')}>Plannipoker</Header>
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

export default withRouter(App);
