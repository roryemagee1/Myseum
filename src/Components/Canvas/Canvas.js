import './Canvas.css'
import React from 'react';
import Art from '../Art/Art.js';

const Canvas = ({ inputs, toggleSave, view }) => {
  let output = inputs.filter(input => input.primaryImage).map(input => {  
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

  return (
    <div className="grid">
      {output}
    </div>
  )
}

export default Canvas;