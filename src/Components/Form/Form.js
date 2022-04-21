import './Form.css';
import React, { Component } from 'react';

class Form extends Component {
  constructor() {
    super()
    this.state = {
      search: '' 
    }
  }

  updateSearch = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    this.setState({ [name]: value });
  }

  submitSearch = (e) => {
    e.preventDefault();
    this.props.searchPaintings(this.state.search);
    this.clearSearch();
  }

  clearSearch = () => {
    this.setState({ search: ''})
  }
  
  render() {
    return (
      <form className="search">
        <input className="search-bar" type="text" placeholder="Search" value={this.state.search} name="search" onChange={(e) => this.updateSearch(e)}/>
        <button className="search-button" onClick={(e) => this.submitSearch(e)}> Go </button>
      </form>
    );
  }
}

export default Form;
