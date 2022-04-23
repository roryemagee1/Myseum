import './Canvas.css'
import React from 'react';
import Art from '../Art/Art.js';

const Canvas = ({ paintings, favorited, toggleFavorite }) => {
  let output = paintings.filter(painting => painting.primaryImage).map(painting => {  
    let starStatus = false;
    if (favorited.some(favorite => favorite.objectID === painting.objectID)) {
      starStatus = true;
    }
      return (
        <Art 
          key={painting.objectID} 
          id={painting.objectID}
          title={painting.title}
          artistDisplayName={painting.artistDisplayName}
          primaryImage={painting.primaryImage}
          toggleFavorite={toggleFavorite}
          starStatus={starStatus}
        />
      )
    // if (painting.primaryImage) {
    //   return <img className="container" src={painting.primaryImage} alt={painting.title} key={index} id={index}/>
    // }
  })

  return (
    <div className="grid">
      {output}
    </div>
  )
}

export default Canvas;