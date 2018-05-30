import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ListIcon from '@material-ui/icons/List';
import PeopleIcon from '@material-ui/icons/People';
import Drawer from '../Components/Drawer';
import Stories from './stories';
import Players from './players';

export default class RightDrawer extends React.Component {
  state = {
    value: 'stories',
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return (
      <Drawer position="right">
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          fullWidth
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab icon={<ListIcon />} value="stories" />
          <Tab icon={<PeopleIcon />} value="players" />
        </Tabs>
        { value === 'stories' && <Stories />}
        { value === 'players' && <Players />}
      </Drawer>
    );
  }
}
