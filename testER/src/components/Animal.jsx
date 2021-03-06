import React from 'react'
import ButtonContainer from './ButtonContainer.jsx'
import './Legend.css'

const Animal = ({ animal, animalTrack, animalOnTrackClicked }) => {
  return (
    <>
      <div id='animal-legend-content'>
        <div id='track-buttons'>
        {/* track_visibility={track_vis} onTrackClickedButton={onTrackClick} */}
          <ButtonContainer buttonTrack={animalTrack} animalOnTrackClicked={(updatedTrack) => animalOnTrackClicked(updatedTrack)}/>
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
