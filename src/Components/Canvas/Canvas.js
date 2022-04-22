import './Canvas.css'
import React from 'react';
import Art from '../Art/Art.js';
import apiCalls from '../../apiCalls';

const Canvas = ({ paintings }) => {
  let output = paintings.map((painting, index) => {
    if (painting.primaryImage) {
      return <img className="container" src={painting.primaryImage} alt={painting.title} key={index} id={index}/>
    }
  })

  return (
    <div className="grid">
      {output}
    </div>
  )
}

export default Canvas;