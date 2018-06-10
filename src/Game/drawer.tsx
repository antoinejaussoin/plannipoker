import React from 'react';
import styled from 'styled-components';
import { Tabs, Tab } from '@material-ui/core';
import ListIcon from '@material-ui/icons/List';
import PeopleIcon from '@material-ui/icons/People';
import Drawer from '../Components/Drawer';
import Stories from './stories';
import Players from './players';

export interface RightDrawerProps {
  open: boolean;
  onToggle: () => void;
}

const Content = styled.section`
  padding: 5px;
`;

export default class RightDrawer extends React.Component<RightDrawerProps> {
  state = {
    value: 'stories',
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    const { open, onToggle } = this.props;
    return (
      <Drawer position="right" open={open} onToggle={onToggle}>
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
        <Content>
          { value === 'stories' && <Stories />}
          { value === 'players' && <Players />}
        </Content>
      </Drawer>
    );
  }
}
