import React, { Component } from 'react';
import './App.css';
import Card from './Components/Card';

class App extends Component {
  render() {
    return (
      <div>
        <Card>1</Card>
        <Card>2</Card>
        <Card>3</Card>
        <Card>🍎</Card>
      </div>
    );
  }
}

export default App;
