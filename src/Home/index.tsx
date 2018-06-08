import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import shortid from 'shortid';
import { Typography, Button } from '@material-ui/core';
import { VideogameAsset } from '@material-ui/icons';

const Page = styled.div`
  text-align: center;
  margin-top: 50px;

  a {
    margin-top: 30px;
  }
`;

const StartGameLink = (props) => <Link to={`/games/${shortid.generate()}`} {...props} />;

const IconButton = styled(Button)`
  svg {
    margin-left: 10px;
  }
`;

class Home extends Component {
  render() {
    return (
      <Page>
        <Typography variant="display2" gutterBottom align="center">Welcome to Plannipoker</Typography>

        <IconButton variant="raised" color="secondary" component={StartGameLink}>
          Start a new game
          <VideogameAsset  />
        </IconButton>
      </Page>
    );
  }
}

export default Home;
