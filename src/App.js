import './App.css';
import easelandcanvas from './Assets/easelandcanvas.png';
import artExhibit from './Assets/ArtExhibit.jpeg'
import React, { Component } from 'react';
import Form from './Components/Form/Form.js';
import Canvas from './Components/Canvas/Canvas.js';
import apiCalls from './apiCalls';

class App extends Component {
  constructor() {
    super()
    this.state = {
      paintingIDs: [],
      paintings: []
    }
  }
  
  searchPaintings = (search) => {
    this.setState({ paintingIDs: [], paintings: [] })
    apiCalls.fetchPaintingIDs(search)
      .then(data => this.setState({ paintingIDs: data.objectIDs }))
      .catch(error => console.log(error));
    const allPaintings = this.state.paintingIDs.map(id => apiCalls.fetchPainting(id).then(data => data));
    this.setState({ ...this.state, paintings: allPaintings });
  }
  
  render() {
    return (
      <div className="everything">
        <h1 className="title"> Myseum </h1>
        <img src={artExhibit} className="background" alt="Posh art exhibit"/>
        <main>
          <img src={easelandcanvas} className="easel" alt="Easel and canvas"/>
          <div className="easel-window">
          <Canvas paintings={this.state.paintingIDs}/>
          </div>
          <Form searchPaintings={this.searchPaintings}/>
        </main>
      </div>
    );
  }
}

export default App;
