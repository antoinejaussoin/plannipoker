import React from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import { Avatar, List, ListItem, ListItemText, Button } from '@material-ui/core';
import Input from '../Components/Input';
import Store from '../store';

const Container = styled.section`

`;

const NewStory = styled.div`

`;

export interface GameProps {
  store?: Store;
}

@inject('store')
@observer
class StoriesList extends React.Component<GameProps> {
  render() {
    const { game, newStoryName } = this.props.store;
    if (!game) {
      return null;
    }

    return (
      <Container>
        <NewStory>
          <Input
            label="Add a story"
            value={newStoryName}
            onChange={name => this.props.store.updateNewStoryName(name)} />
          <Button onClick={() => this.props.store.createStory()}>Add</Button>
        </NewStory>
        <List>
          {
            game.stories.map(((story, index) => (
              <ListItem key={index} dense button>
                <ListItemText primary={story.description} />
              </ListItem>
            )))
          }
        </List>
      </Container>
    );
  }
}

export default StoriesList;
