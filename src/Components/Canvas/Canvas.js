import './Canvas.css'
import React from 'react';
import Art from '../Art/Art.js';

const Canvas = ({ paintings, toggleFavorite }) => {
  let output = paintings.filter(painting => painting.primaryImage).map(painting => {  
    // console.log(painting.objectID);
      return (
        <Art 
          key={painting.objectID} 
          id={painting.objectID}
          title={painting.title}
          artistDisplayName={painting.artistDisplayName}
          primaryImage={painting.primaryImage}
          isFavorite={painting.isFavorite}
          toggleFavorite={toggleFavorite}
        />
      )
  })

  return (
    <div className="grid">
      {output}
    </div>
  )
}

export default Canvas;