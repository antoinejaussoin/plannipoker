import React from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import { Avatar, List, ListItem, ListItemText, ListItemIcon,
  Button, Card, CardContent, colors, CardActions, CardHeader, withTheme, WithTheme } from '@material-ui/core';
import BookIcon from '@material-ui/icons/Bookmark';
import Input from '../Components/Input';
import Store from '../store';

const Container = styled.section``;

const NewStory = styled.div``;

export interface GameProps {
  store?: Store;
}

@inject('store')
@observer
class StoriesList extends React.Component<GameProps & WithTheme> {
  render() {
    const { store, theme } = this.props;
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
            <Button
              onClick={() => store.createStory()}
              disabled={!canCreateStory}
              variant="raised"
              >Add</Button>
          </CardActions>
        </Card>
        <Card>
          <CardContent>
            <List>
              {
                game.stories.map((story => {
                  const isCurrent = story.id === game.currentStoryId;
                  const backgroundColor = isCurrent ? theme.palette.secondary.light : undefined;
                  const foregroundColor = isCurrent ? theme.palette.secondary.contrastText : undefined;
                  return (
                    <ListItem
                      key={story.id}
                      dense button
                      onClick={() => store.selectStory(story)}
                      style={{ backgroundColor }}>
                      <ListItemIcon><BookIcon style={{ color: foregroundColor }} /></ListItemIcon>
                      <ListItemText>
                        <span style={{ color: foregroundColor }}>{story.title}</span>
                      </ListItemText>
                    </ListItem>
                  );
                }))
              }
            </List>
          </CardContent>
        </Card>
      </Container>
    );
  }
}

export default withTheme()(StoriesList);
