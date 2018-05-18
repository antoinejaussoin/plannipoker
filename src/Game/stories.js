import React from 'react';
import { observer, inject } from 'mobx-react';
import { Avatar, List, ListItem, ListItemText } from 'material-ui';


@inject('store')
@observer
class StoriesList extends React.Component {
  render() {
    const { game } = this.props.store;
    if (!game) {
      return null;
    }

    return (
      <List>
        {game.stories.map(story => (
          <ListItem key={story.id} dense button>
            <ListItemText primary={story.description} />
          </ListItem>
        ))}
      </List>
    )
  }
}

export default StoriesList;
