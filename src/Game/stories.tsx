import React from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import { Avatar, List, ListItem, ListItemText,
  Button, Card, CardContent, colors, CardActions, CardHeader } from '@material-ui/core';
import Input from '../Components/Input';
import Store from '../store';

const Container = styled.section``;

const NewStory = styled.div``;

export interface GameProps {
  store?: Store;
}

@inject('store')
@observer
class StoriesList extends React.Component<GameProps> {
  render() {
    const { store } = this.props;
    const { game, newStoryName, newStoryDescription, canCreateStory } = store;
    if (!game) {
      return null;
    }

    return (
      <Container>
        <Card>
          <CardHeader title="New Story" />
          <CardContent>
            <Input
              label="Title (or Jira Number)"
              value={newStoryName}
              onChange={name => store.updateNewStoryName(name)} />
            <Input
              label="Short description"
              value={newStoryDescription}
              onChange={description => store.updateNewStoryDescription(description)} />
          </CardContent>
          <CardActions>
            <Button onClick={() => store.createStory()} disabled={!canCreateStory}>Add</Button>
          </CardActions>
        </Card>
        <List>
          {
            game.stories.map((story => (
              <ListItem
                key={story.id}
                dense button
                onClick={() => store.selectStory(story)}
                style={{
                  backgroundColor: story.id === game.currentStoryId ? colors.lightBlue['300'] : undefined,
                }}>
                <ListItemText primary={story.title} />
              </ListItem>
            )))
          }
        </List>
      </Container>
    );
  }
}

export default StoriesList;
