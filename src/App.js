import './App.css';
import easelandcanvas from './Assets/easelandcanvas.png';
import artExhibit from './Assets/ArtExhibit.jpeg'
import React, { Component } from 'react';
import Form from './Components/Form/Form.js'

class App extends Component {
  constructor() {
    super()
    this.state = {
      paintings: []
    }
  }
  
  render() {
    return (
      <div className="everything">
        <h1 className="title"> Myseum </h1>
        <img src={artExhibit} className="background" alt="Posh art exhibit"/>
        <main>
          <img src={easelandcanvas} className="easel" alt="Easel and canvas"/>
          <div className="easel-window">

          </div>
          <Form />
        </main>
      </div>
    );
  }
}

export default App;
