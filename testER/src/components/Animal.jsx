import React from 'react'
import TrackButton from './TrackButton.jsx'
import LocButton from './LocButton.jsx'
import './Legend.css'

/* eslint-disable react/prop-types */
const Animal = ({ animal, animalTrack, animalOnTrackClicked, animalOnLocClicked }) => {
  const backgroundColor = { backgroundColor: animal.color }
  return (
    <>
      <div id='animal-legend-content'>
        <div id='animal-color' style={backgroundColor} />
        <div id='animal-name'>
          <p>{animal.name}</p>
        </div>
        <div id='track-buttons'>
          <TrackButton
            subject={animal}
            buttonTrack={animalTrack}
            buttonOnTrackClicked={animalOnTrackClicked}
          />
          <LocButton
            subject={animal}
            buttonOnLocClicked={animalOnLocClicked}
          />
          {// Add another icon to take to legend description of subject!!
          /* <img id='arrow' className='hover' src='public/images/arrow.svg'/> */}
        </div>

      </div>
    </>
  )
}

export default Animal
