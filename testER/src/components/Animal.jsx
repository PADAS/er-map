import React from 'react'
import './Legend.css'

const Animal = ({ mes }) => {
  return (
    <>
      <div id='animal-legend-content'>
        <div id='track-buttons'>
          {/* <div>button</div> */}
          <input type='checkbox' unchecked />
        </div>
        <div id='animal-img'>
          <p>image</p>
          {/* <img src={mes.last_position.properties.image} /> */}
        </div>
        <div id='animal-name'>
          <p>{mes.name}</p>
        </div>
        {/* <p>{mes}</p> */}
      </div>
    </>
  )
}

export default Animal
