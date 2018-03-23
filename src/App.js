import React, { Component } from 'react';
import styled from 'styled-components';
import Card from './Components/Card';

const Container = styled.div`
  display: flex;
  margin: 30px;

  > * {
    margin-right: 20px;
  }
`;

class App extends Component {
  render() {
    return (
      <Container>
        <Card>1</Card>
        <Card color="yellow">2</Card>
        <Card color="#8bc34a">3</Card>
        <Card>🍎</Card>
      </Container>
    );
  }
}

export default App;
