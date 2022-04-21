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
    const {name, value} = e.target;
    this.setState({ [name]: value });
  }
  
  render() {
    return (
      <div className="search">
        <input className="search-bar" type="text" placeholder="Search" value={this.state.search} name="search" onChange={(e) => this.updateSearch(e)}/>
      </div>
    );
  }
}

export default Form;
