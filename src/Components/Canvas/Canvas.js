import './Canvas.css'
import React from 'react';
import Art from '../Art/Art.js';

const Canvas = ({ paintings }) => {
  let output = paintings.filter(painting => painting.primaryImage).map(painting => {
      return (
        <Art 
          key={painting.objectID} 
          id={painting.objectID}
          title={painting.title}
          artistDisplayName={painting.artistDisplayName}
          primaryImage={painting.primaryImage}
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