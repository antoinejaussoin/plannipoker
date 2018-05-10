import React from 'react';
import { Avatar, List, ListItem, ListItemText } from 'material-ui';
import deepOrange from 'material-ui/colors/deepOrange';

const UserList = ({ users = [] }) => (
  <List>
    {users.map(user => (
      <ListItem key={user.id} dense button>
        <Avatar alt={user.name} style={{ backgroundColor: deepOrange["600"] }}>{user.name[0]}</Avatar>
        <ListItemText primary={user.name} />
      </ListItem>
    ))}
  </List>
);

export default UserList;
