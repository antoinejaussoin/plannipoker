import React from 'react';
import { withStyles, WithStyles, StyledComponentProps } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

const drawerWidth = 300;

export const styles = theme => ({
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      paddingTop: 70,
    },
  },
});

interface DrawerClasses {
  drawerPaper: any;
}

export interface DrawerProps extends WithStyles<keyof ReturnType<typeof styles>> {
  position: 'right' | 'left';
  children: any;
  open: boolean;
  onToggle: () => void;
}

class ResponsiveDrawer extends React.Component<DrawerProps> {
  render() {
    const { position, children, open, onToggle, classes } = this.props;

    return (
      <>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={position}
            open={open}
            onClose={onToggle}
            classes={{ paper: classes.drawerPaper }}
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
            classes={{ paper: classes.drawerPaper }}
          >
            {children}
          </Drawer>
        </Hidden>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
