import React from 'react';
import { withRouter } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography } from 'material-ui';
import MenuIcon from '@material-ui/icons/Menu';

const Header = ({ history }) => (
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
