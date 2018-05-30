import React from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import { Avatar, List, ListItem, ListItemText, Button, colors } from '@material-ui/core';
import Input from '../Components/Input';
import Store from '../store';

const Container = styled.section``;

const NewStory = styled.div``;

export interface GameProps {
  store?: Store;
}

@inject('store')
@observer
class PlayersList extends React.Component<GameProps> {
  render() {
    const { store } = this.props;
    const { game, newStoryName, canCreateStory } = store;
    if (!game) {
      return null;
    }

    return (
      <Container>
        <List>
          {
            game.players.map((player => (
              <ListItem key={player.id} dense button>
                <Avatar
                  alt={player.name}
                  style={{ backgroundColor: colors.deepOrange['600'] }}>{player.name[0]}</Avatar>
                <ListItemText primary={player.name} />
              </ListItem>
            )))
          }
        </List>
      </Container>
    );
  }
}

export default PlayersList;
