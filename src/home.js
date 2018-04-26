import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import shortid from 'shortid';

const Page = styled.div`
  
`;

class Home extends Component {
  render() {
    return (
      <Page>
        <h1>Welcome to Plannipoker</h1>

        <Link to={`/games/${shortid.generate()}`}>Start a new game!</Link>
      </Page>
    );
  }
}

export default Home;
