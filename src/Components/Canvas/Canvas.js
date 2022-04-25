import './Canvas.css'
import React from 'react';
import ReactLoading from 'react-loading';
import Art from '../Art/Art.js';
import PropTypes from 'prop-types';

const Canvas = ({ inputs, toggleSave, view, isLoading, error }) => {
  let output;
  if (isLoading) {
    output = 
      <div className="spinner"> 
        <ReactLoading type='spin' color='black' width={25} /> 
      </div>
  } else if (error) {
    output = <h1> No paintings match that search. </h1>
  } else {
    output = 
    <div className="grid">
      {inputs.filter(input => input.primaryImage).map(input => {  
        return (
          <Art 
            key={input.objectID} 
            id={input.objectID}
            title={input.title}
            artistDisplayName={input.artistDisplayName}
            primaryImage={input.primaryImage}
            isSaved={input.isSaved}
            toggleSave={toggleSave}
            view={view}
          />
        )
      })
    }
    </div>
  }

  return (
    <div className="easel-window">
      {output} 
    </div>
  )
}

export default Canvas;

Canvas.propTypes = { 
    inputs: PropTypes.arrayOf(PropTypes.object),
    toggleSave: PropTypes.func,
    view: PropTypes.string,
    isLoading: PropTypes.bool,
    error: PropTypes.string
  }