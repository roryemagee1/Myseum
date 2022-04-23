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
      favorites: []
    }
  }
  
  searchPaintings = async (search) => {
    this.setState({ paintings: [] })
    const promisePaintingIDs = apiCalls.fetchPaintingIDs(search);
    const dataIDs = await promisePaintingIDs;
    const paintingPromises = dataIDs.objectIDs.map(id => apiCalls.fetchPainting(id));
    const paintingsList = await Promise.all(paintingPromises);
    const listWithStars = paintingsList.map(painting => {
      painting["isFavorite"] = false;
      return painting
    })
    this.setState({ paintings: listWithStars });
  }

  toggleFavorite = (e) => {
    e.preventDefault();
    const input = e.target.id;
    const itemToChange = this.state.paintings.findIndex(painting => painting.objectID == input);
    if (!this.state.paintings[itemToChange].isFavorite) {
      this.setState(prevState => {
        let output = prevState.paintings;
        output[itemToChange].isFavorite = true;
        return { paintings: output }
      })
    } else if (this.state.paintings[itemToChange].isFavorite) {
      this.setState(prevState => {
        let output = prevState.paintings;
        output[itemToChange].isFavorite = false;
        return { paintings: output }
      })
    }
    setTimeout(() => this.updateFavorite(), 100);
  }

  updateFavorite = () => {
    let favorites = this.state.paintings.filter(painting => painting.isFavorite);
    this.setState({ favorites: favorites })
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
