import './Art.css'
import React from 'react';
import goldStar from '../../Assets/gold-star.png';
import blackStar from '../../Assets/black-star.png';

const Art = ({ id, title, artistDisplayName, primaryImage, toggleFavorite, starStatus }) => {
  let star = blackStar; 
  if (starStatus) {
    let star = goldStar;
  }
  return (
    <div  className="container">
      <img className="star" src={star} alt="Inactive favorite star" id={id} onClick={(e) => toggleFavorite(e.target.id)}/>
      <img className="image" src={primaryImage} alt={title} />
      <p className="painting-writing"> {title} by {artistDisplayName} </p>
    </div>
  )
}

export default Art;