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
      paintings: [],
      favorited: []
    }
  }
  
  searchPaintings = async (search) => {
    this.setState({ paintingIDs: [] })
    const promisePaintingIDs = apiCalls.fetchPaintingIDs(search);
    const dataIDs = await promisePaintingIDs;
    const paintingPromises = dataIDs.objectIDs.map(id => apiCalls.fetchPainting(id));
    const paintingsList = await Promise.all(paintingPromises);
    console.log(paintingsList);
    this.setState({ paintings: paintingsList });
  }

  favoritePainting = (id) => {
    const favorite = this.state.paintings.find(painting => painting.objectID === id)
    this.setState({ favorited: [...this.state.favorited, favorite] })
  }

  unfavoritePainting = (id) => {
    const favoritesLeft = this.state.favorited.filter(painting=> painting.objectID !== id)
    this.setState({ favorited: [favoritesLeft] })
  }

  toggleFavorite = (id) => {
    if (this.state.favorited.some(favorite => favorite.objectID === id)) {
      this.unfavoritePainting(id);
    } else if (!this.state.favorited.find(favorite => favorite.objectID === id)) {
      this.favoritePainting(id);
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
          <Canvas paintings={this.state.paintings} favorited={this.state.favorited} toggleFavorite={this.toggleFavorite}/>
          </div>
          <Form searchPaintings={this.searchPaintings}/>
        </main>
      </div>
    );
  }
}

export default App;
