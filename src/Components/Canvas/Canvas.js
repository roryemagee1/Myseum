import './Canvas.css'
import React from 'react';
import ReactLoading from 'react-loading';
import Art from '../Art/Art.js';

const Canvas = ({ inputs, toggleSave, view, isLoading }) => {
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
    <div className="easel-window">
        {
          isLoading ? (
            <div className="spinner"> 
              <ReactLoading type='spin' color='black' width={25} /> 
            </div>
            ) : (
            <div className="grid"> 
              {output} 
            </div> )
        }
    </div>
  )
}

export default Canvas;