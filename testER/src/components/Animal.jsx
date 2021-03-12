import React from 'react'
import TrackButton from './TrackButton.jsx'
import LocButton from './LocButton.jsx'
import './Legend.css'

/* eslint-disable react/prop-types */
const Animal = ({ animal, animalTrack, animalOnTrackClicked, animalOnLocClicked }) => {
  return (
    <>
      <div id='animal-legend-content'>
        <div id='track-buttons'>
          <div id='button-container'>
            <TrackButton
              subject={animal}
              buttonTrack={animalTrack}
              buttonOnTrackClicked={animalOnTrackClicked}
            />
            <LocButton
              subject={animal}
              buttonOnLocClicked={animalOnLocClicked}
            />
          </div>
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
