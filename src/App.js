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
  
  searchPaintings = async (search) => {
    this.setState({ paintingIDs: [], paintings: [] })
    apiCalls.fetchPaintingIDs(search)
      .then(data => this.setState({ paintingIDs: data.objectIDs, paintings: [] }))
      .catch(error => console.log(error));
    let output = [];
    setTimeout(() => {this.state.paintingIDs.forEach(id => apiCalls.fetchPainting(id).then(data => output.push(data) ))}, 1000);
    setTimeout(() => {this.setState({ paintings: output})}, 3000);
  }

  // getPaintings = () => {
  //   this.state.paintingIDs.forEach(id => apiCalls.fetchPainting(id).then(data => console.log(data)));
  // }
  
  render() {
    return (
      <div className="everything">
        <h1 className="title"> Myseum </h1>
        <img src={artExhibit} className="background" alt="Posh art exhibit"/>
        <main>
          <img src={easelandcanvas} className="easel" alt="Easel and canvas"/>
          <div className="easel-window">
          <Canvas paintings={this.state.paintings}/>
          </div>
          <Form searchPaintings={this.searchPaintings}/>
        </main>
      </div>
    );
  }
}

export default App;
