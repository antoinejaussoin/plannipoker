import React, { SFC } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { withStyles, WithStyles, StyledComponentProps } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => ({
  appBar: {
    zIndex: 5000, // theme.zIndex.drawer + 1,
    position: 'relative' as 'relative',
  },
});

export interface HeaderProps extends RouteComponentProps<{}, {}>, WithStyles<'appBar'> {}

export const Header: SFC<HeaderProps> = ({ history, classes }) => (
  <AppBar position="static" className={classes.appBar + ' blah'}>
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

export default withStyles(styles, { withTheme: true })(withRouter(Header));
