import React, { SFC } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

export const Header: SFC<RouteComponentProps<{}, {}>> = ({ history }) => (
  <AppBar position="static">
    <Toolbar>
      <IconButton color="inherit" aria-label="Menu">
        <MenuIcon />
      </IconButton>
      <Typography variant="title" color="inherit" onClick={() => history.push('/')}>
        Plannipoker
      </Typography>
    </Toolbar>
  </AppBar>
);

export default withRouter(Header);
