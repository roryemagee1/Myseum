import './Art.css'
import React from 'react';
import goldStar from '../../Assets/gold-star.png';
import blackStar from '../../Assets/black-star.png';

const Art = ({ id, title, artistDisplayName, primaryImage, isSaved, toggleSave}) => {
  let saveStatus = "Save?";
  if (isSaved) {
    saveStatus = "Saved!";
  }
  // let star = blackStar;
  // if (isFavorite) {
  //   star = goldStar;
  // }
  return (
    <div  className="container">
      <button className="save-button" id={id} onClick={(e) => toggleSave(e)}> {saveStatus} </button>
      {/* <img className="star" src={star} alt="Inactive favorite star" id={id} onClick={(e) => toggleFavorite(e)}/> */}
      <img className="image" src={primaryImage} alt={title} />
      <p className="painting-writing"> {title} by {artistDisplayName} </p>
    </div>
  )
}

export default Art;