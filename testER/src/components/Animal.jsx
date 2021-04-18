import React from 'react'
import TrackButton from './TrackButton.jsx'
import LocButton from './LocButton.jsx'
import './Legend.css'

/* eslint-disable react/prop-types */
const Animal = ({ animal, configData, animalTrack, animalOnTrackClicked,
                  animalOnLocClicked, onNameClick, displayStory }) => {
  const backgroundColor = { backgroundColor: animal.color }
  const animalId = animal.id + " animal"
  let hover = 'hover'
  let animalName = 'animal-name '
  let display = {display: 'block'}

  if (configData === undefined || !displayStory) {
    hover = 'default'
    animalName = ''
    display = {display: 'none'}
  }

  return (
    <>
      <div id='animal-legend-content'>
        <div id='animal-color' style={backgroundColor} />
        <div className={'fit-content ' + animalName + hover} id={animalId} onClick={() => {
              let name = document.getElementById(animalId)

              if (name.classList.contains('animal-name')) {
                onNameClick([animal, configData.subjects[animal.id]])
                name.classList.toggle('animal-name')
                name.classList.toggle('hover')
              }
            }}>
          <p className={hover} id='animal-name-p'>{animal.name}</p>
        </div>
        <div id='track-buttons'>
          <TrackButton
            subject={animal}
            buttonTrack={animalTrack}
            handleOnTrackButtonClicked={animalOnTrackClicked}
          />
          <LocButton
            subject={animal}
            handleOnLocButtonClicked={animalOnLocClicked}
          />
          <img id='story-button' style={display} src='/public/images/button_icons/story-f.png'
          onClick={() => {onNameClick([animal, configData.subjects[animal.id]])}}/>
        </div>

      </div>
    </>
  )
}

export default Animal
