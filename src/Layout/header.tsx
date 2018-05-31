import React, { SFC } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Hidden } from '@material-ui/core';
import { withStyles, WithStyles, StyledComponentProps } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Store from '../store';
import styled from 'styled-components';

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    position: 'relative' as 'relative',
  },
});

const Title = styled(Typography)`
  flex: 1;
`;

export interface HeaderProps extends RouteComponentProps<{}, {}>, WithStyles<'appBar'> {
  store?: Store;
}

@observer
@inject('store')
export class Header extends React.Component<HeaderProps> {
  render() {
    const { history, classes, store } = this.props;
    return (
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Title variant="title" color="inherit" onClick={() => history.push('/')}>
            Plannipoker
          </Title>
          <Hidden mdUp>
            <IconButton color="inherit" aria-label="Menu">
              <MenuIcon onClick={store.toggleDrawer} />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles, { withTheme: true })(withRouter(Header));
