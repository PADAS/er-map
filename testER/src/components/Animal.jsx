import React from 'react'
import ButtonContainer from './ButtonContainer.jsx'
import './Legend.css'

/* eslint-disable react/prop-types */
const Animal = ({ animal, animalTrack, animalOnTrackClicked }) => {
  return (
    <>
      <div id='animal-legend-content'>
        <div id='track-buttons'>
          {/* track_visibility={track_vis} onTrackClickedButton={onTrackClick} */}
          <ButtonContainer id={animal.id} buttonTrack={animalTrack} buttonOnTrackClicked={animalOnTrackClicked} />
        </div>
        <div id='animal-img'>
          {/* <p>image</p> */}
          <img src={animal.last_position.properties.image} />
        </div>
        <div id='animal-name'>
          <p>{animal.name}</p>
        </div>
      </div>
    </>
  )
}

export default Animal
