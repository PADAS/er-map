import React from 'react'
import ButtonContainer from './ButtonContainer.jsx'
import './Legend.css'

const Animal = ({ mes, track_vis, onTrackClick }) => {
  return (
    <>
      <div id='animal-legend-content'>
        <div id='track-buttons'>
          <ButtonContainer track_visibility={track_vis} onTrackClickedButton={onTrackClick}/>
        </div>
        <div id='animal-img'>
          <p>image</p>
          {/* <img src={mes.last_position.properties.image} /> */}
        </div>
        <div id='animal-name'>
          <p>{mes.name}</p>
        </div>
      </div>
    </>
  )
}

export default Animal
