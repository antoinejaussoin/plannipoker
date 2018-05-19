import React, { SFC } from 'react';
import { Avatar, List, ListItem, ListItemText } from 'material-ui';
import deepOrange from 'material-ui/colors/deepOrange';
import { Player } from '../../models';

export interface PlayerListProps {
  players: Player[];
}

const PlayerList: SFC<PlayerListProps> = ({ players = [] }) => (
  <List>
    {players.map(user => (
      <ListItem key={user.id} dense button>
        <Avatar alt={user.name} style={{ backgroundColor: deepOrange['600'] }}>{user.name[0]}</Avatar>
        <ListItemText primary={user.name} />
      </ListItem>
    ))}
  </List>
);

export default PlayerList;
