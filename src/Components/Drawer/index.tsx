import React from 'react';
import { withStyles, WithStyles, StyledComponentProps } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

const drawerWidth = 300;

export const styles = theme => ({
  drawerPaper: {
    marginTop: 70,
    width: drawerWidth,
  },
});

interface DrawerClasses {
  drawerPaper: any;
}

export interface DrawerProps extends WithStyles<keyof ReturnType<typeof styles>> {
  position: 'right' | 'left';
  children: any;
}

class ResponsiveDrawer extends React.Component<DrawerProps> {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const { position, children, classes } = this.props;

    return (
      <>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={position}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {children}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            anchor={position}
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {children}
          </Drawer>
        </Hidden>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
