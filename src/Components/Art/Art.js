import './Art.css'
import React from 'react';

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
      <img className="image" src={primaryImage} alt={title} />
      <p className="painting-writing"> {title} by {artistDisplayName} </p>
    </div>
  )
}

export default Art;