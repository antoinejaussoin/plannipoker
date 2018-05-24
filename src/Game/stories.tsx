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
    const { store } = this.props;
    const { game, newStoryName, canCreateStory } = store;
    if (!game) {
      return null;
    }

    return (
      <Container>
        <NewStory>
          <Input
            label="Add a story"
            value={newStoryName}
            onChange={name => store.updateNewStoryName(name)} />
          <Button onClick={() => store.createStory()} disabled={!canCreateStory}>Add</Button>
        </NewStory>
        <List>
          {
            game.stories.map((story => (
              <ListItem
                key={story.id}
                dense button
                onClick={() => store.selectStory(story.id)}
                style={{
                  backgroundColor: story.id === game.currentStoryId ? 'red': undefined,
                }}>
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
