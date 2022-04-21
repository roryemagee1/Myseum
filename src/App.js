import './App.css';
import easelandcanvas from './Assets/easelandcanvas.png';
import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super()
    this.state = {}
  }
  
  render() {
    return (
      <div className="background">
        <h1 className="placeholder"> Myseum</h1>
        <div className="easel-container">
          <img src={easelandcanvas} className="easel" />
        </div>
      </div>
    );
  }
}

export default App;
