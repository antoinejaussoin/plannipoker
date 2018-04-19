import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const User = styled.div`
  align-self: center;
  flex: 1;
`;

const UserList = ({ users = [] }) => (
  <Container>
    {users.map(user => (
      <User key={user.id}>
        {user.name}
      </User>
    ))}
  </Container>
);

export default UserList;
