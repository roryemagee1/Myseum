import './Art.css'
import React from 'react';
import goldStar from '../../Assets/gold-star.png';
import blackStar from '../../Assets/black-star.png';

const Art = ({ title, artistDisplayName, primaryImage }) => {
  return (
    <div className="container">
      <img className="star" src={blackStar} alt="Inactive favorite star" />
      <img className="image" src={primaryImage} alt={title} />
      <p className="painting-writing"> {title} by {artistDisplayName} </p>
    </div>
  )
}

export default Art;