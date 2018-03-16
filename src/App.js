import React, { Component } from 'react';
import './App.css';
import Card from './Components/Card';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Card>1</Card>
        <Card color="yellow">2</Card>
        <Card color="#8bc34a">3</Card>
        <Card>🍎</Card>
      </div>
    );
  }
}

export default App;
