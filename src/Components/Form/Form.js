import './Form.css';
import React, { Component } from 'react';

class Form extends Component {
  constructor() {
    super()
    this.state = {}
  }
  
  render() {
    return (
      <div className="search">
        <input type="text" />
      </div>
    );
  }
}

export default Form;
