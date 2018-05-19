import React from 'react';
import { observer, inject } from 'mobx-react';
import { Avatar, List, ListItem, ListItemText } from '@material-ui/core';
import Store from '../store';

export interface GameProps {
  store?: Store;
}

@inject('store')
@observer
class StoriesList extends React.Component<GameProps> {
  render() {
    const { game } = this.props.store;
    if (!game) {
      return null;
    }

    return (
      <List>
        {
          game.stories.map(((story, index) => (
            <ListItem key={index} dense button>
              <ListItemText primary={story.description} />
            </ListItem>
          )))
        }
      </List>
    );
  }
}

export default StoriesList;
