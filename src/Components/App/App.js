import './App.css';
import easelandcanvas from '../../Assets/easelandcanvas.png';
import artExhibit from '../../Assets/ArtExhibit.jpeg'
import React, { Component } from 'react';
import Form from '../Form/Form.js';
import Canvas from '../Canvas/Canvas.js';
import apiCalls from '../../apiCalls';
import { Route, Redirect, Switch, Link } from 'react-router-dom';
import springCleaning from '../../Utilities/springCleaning';

class App extends Component {
  constructor() {
    super()
    this.state = {
      paintings: [],
      saves: [],
      view: '',
      error: '',
      isLoading: false
    }
  }
  
  searchPaintings = async (search) => {
    this.setState({ paintings: [], isLoading: true, error: '' })
    const promisePaintingIDs = apiCalls.fetchPaintingIDs(search);
    const dataIDs = await promisePaintingIDs;
    if (!dataIDs.objectIDs) {
      this.setState({ paintings: [], isLoading: false, error: 'No paintings match that search.'})
    } else {
    const paintingPromises = dataIDs.objectIDs.map(id => apiCalls.fetchPainting(id));
    const paintingsList = await Promise.all(paintingPromises);
    const listWithSaves = paintingsList.filter(painting => springCleaning.removeImagelessData(painting))
    .map(painting => {
      painting["isSaved"] = false;
      return painting
    })
    this.setState({ paintings: listWithSaves, isLoading: false });
    }
  }
      
  activateSave = (e) => {
    // e.preventDefault();
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
    additions.forEach(addition => {
      if (!this.state.saves.some(save => save.objectID == addition.objectID)) {
        this.setState({ saves: [...this.state.saves, addition] })
      }
    }) 
  }

  unSave = (e) => {
    // e.preventDefault();
    const input = e.target.id;
    const itemToChange = this.state.saves.findIndex(save => save.objectID == input);
    if (this.state.saves[itemToChange].isSaved) {
      this.setState(prevState => {
        let output = prevState.saves;
        output[itemToChange].isSaved = false;
        return { saves: output }
      })
    }
    setTimeout(() => this.removeSaves(), 100);
  }

  removeSaves = () => {
    let leftOvers = this.state.saves.filter(saves => saves.isSaved);
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
          <Switch>
            <Route exact path="/" render={() => {
              return (
                <section>
                  <Canvas 
                    view={this.state.view} 
                    inputs={this.state.paintings} 
                    toggleSave={this.activateSave} 
                    isLoading={this.state.isLoading}/>
                  <Form searchPaintings={this.searchPaintings} changeView={this.changeView}/>
                </section>
                )
              }
            }/>
    
            <Route exact path="/search/:query" render={({ match }) => {
              // if (!this.state.paintings.length) {
              //   this.searchPaintings(match.params.query);
              // }

              return (
                <section>
                  <Canvas 
                    view={this.state.view} 
                    inputs={this.state.paintings} 
                    toggleSave={this.activateSave}
                    isLoading={this.state.isLoading}
                    error={this.state.error}
                    />
                  <Form 
                    searchPaintings={this.searchPaintings} 
                    changeView={this.changeView}
                    />
                </section>
                ) 
              }
            }/>


            <Route exact path='/saves' render={() => {
              return ( 
                <section>
                  <Canvas 
                    view={this.state.view} 
                    inputs={this.state.saves} 
                    toggleSave={this.unSave}
                    isLoading={this.state.isLoading}
                    />
                  <div className="home-container">
                    <Link to={`/`}>
                      <button className="home-button" value="" onClick={(e) => this.homeView(e)}> Return to Search </button>
                    </Link>
                  </div>
                </section>
                )
              } 
            }/>
            <Route render={({ match }) => {
              return (
                <Redirect to='/' />
              )
            }
            } />
          </Switch>



          {/* {!this.state.view &&
            <section>
              <Canvas view={this.state.view} inputs={this.state.paintings} toggleSave={this.activateSave}/>
              <Form searchPaintings={this.searchPaintings} changeView={this.changeView}/>
            </section>
          }
          {this.state.view &&
            <section>
                <Canvas view={this.state.view} inputs={this.state.saves} toggleSave={this.unSave}/>
              <div className="home-container">
                <button className="home-button" value="" onClick={(e) => this.homeView(e)}> Return to Search </button>
              </div>
            </section>
          } */}
        </main>
      </div>
    );
  }
}

export default App;
