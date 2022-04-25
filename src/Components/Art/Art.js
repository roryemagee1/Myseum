import './Art.css'
import React from 'react';
import PropTypes from 'prop-types';

const Art = ({ id, title, artistDisplayName, primaryImage, isSaved, toggleSave, view }) => {
  let saveStatus = "Save?";
  if (isSaved && view) {
    saveStatus = "Unsave?";
  } else if (!isSaved && view) {
    saveStatus = "Unsaved!";
  } else if (isSaved) {
    saveStatus = "Saved!"
  }
  return (
    <div  className="container">
      <button className="save-button" id={id} onClick={(e) => toggleSave(e)}> {saveStatus} </button>
      <img className="painting-image" src={primaryImage} alt={title} />
      <p className="painting-writing"> {title} by {artistDisplayName} </p>
    </div>
  )
}

export default Art;

Art.propTypes = { 
  id: PropTypes.number,
  title: PropTypes.string, 
  primaryImage: PropTypes.string,
  isSaved: PropTypes.bool,
  error: PropTypes.string,
  toggleSave: PropTypes.func,
  view: PropTypes.string,
}