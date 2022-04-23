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
      saves: [],
      view: ''
    }
  }
  
  searchPaintings = async (search) => {
    this.setState({ paintings: [] })
    const promisePaintingIDs = apiCalls.fetchPaintingIDs(search);
    const dataIDs = await promisePaintingIDs;
    const paintingPromises = dataIDs.objectIDs.map(id => apiCalls.fetchPainting(id));
    const paintingsList = await Promise.all(paintingPromises);
    const listWithStars = paintingsList.map(painting => {
      painting["isSaved"] = false;
      return painting
    })
    this.setState({ paintings: listWithStars });
  }

  activateSave = (e) => {
    e.preventDefault();
    const input = e.target.id;
    const itemToChange = this.state.paintings.findIndex(painting => painting.objectID == input);
    if (!this.state.paintings[itemToChange].isSaved) {
      this.setState(prevState => {
        let output = prevState.paintings;
        output[itemToChange].isSaved = true;
        return { paintings: output }
      })
    }
    setTimeout(() => this.addSaves(), 100);
  }

  addSaves = () => {
    let additions = this.state.paintings.filter(painting => painting.isSaved);
    this.setState({ saves: [...this.state.saves, ...additions] })
  }

  unSave = (e) => {
    e.preventDefault();
    const input = e.target.id;
    const itemToChange = this.state.paintings.findIndex(painting => painting.objectID == input);
    if (this.state.paintings[itemToChange].isSaved) {
      this.setState(prevState => {
        let output = prevState.paintings;
        output[itemToChange].isSaved = false;
        return { paintings: output }
      })
    }
    setTimeout(() => this.removeSaves(), 100);
  }

  removeSaves = () => {
    let leftOvers = this.state.paintings.filter(saves => saves.isSaved);
    this.setState({ saves: [...leftOvers] });
  }

  changeView = (newView) => {
    this.setState({ view: newView })
  }

  homeView = (e) => {  
    const newView = e.target.value;
    this.changeView(newView)
  }
  
  render() {
    return (
      <div className="everything">
        <h1 className="title"> Myseum </h1>
        <img src={artExhibit} className="background" alt="Posh art exhibit"/>
        <img src={easelandcanvas} className="easel" alt="Easel and canvas"/>
        <main>
          {!this.state.view &&
            <section>
              <div className="easel-window">
                <Canvas view={this.state.view} inputs={this.state.paintings} toggleSave={this.activateSave}/>
              </div>
              <Form searchPaintings={this.searchPaintings} changeView={this.changeView}/>
            </section>
          }
          {this.state.view &&
            <section>
              <div className="easel-window">
                <Canvas view={this.state.view} inputs={this.state.saves} toggleSave={this.unSave}/>
              </div>
              <div className="home-container">
                <button className="home-button" value="" onClick={(e) => this.homeView(e)}> Return to Search </button>
              </div>
            </section>
          }
        </main>
      </div>
    );
  }
}

export default App;
