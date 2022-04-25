import './Form.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Form extends Component {
  constructor() {
    super()
    this.state = {
      search: '' 
    }
  }

  updateSearch = (e) => {
    const {name, value} = e.target;
    this.setState({ [name]: value });
  }

  submitSearch = (e) => {
    if (this.state.search) {
    this.props.searchPaintings(this.state.search);
    this.clearSearch();
    }
  }

  clearSearch = () => {
    this.setState({ search: ''})
  }

  updateView = (e) => {
    const newView = e.target.value;
    this.props.changeView(newView);
  }
  
  render() {
    let query = this.state.search;

    return (
      <form className="search">
        <input className="search-bar" type="text" placeholder="Search" value={this.state.search} name="search" onChange={(e) => this.updateSearch(e)} />
        <Link to={`/search/${query}`}>
          <button className="search-button" onClick={(e) => this.submitSearch(e)}> Go </button>
        </Link>
        <Link to={`/saves`}>
          <button className="view-saves" value="toSaves" onClick={(e) => this.updateView(e)}> View Saved Paintings </button>
        </Link>
      </form>
    );
  }
}

export default Form;

Form.propTypes = { 
  searchPaintings: PropTypes.func,
  changeView: PropTypes.func
}
