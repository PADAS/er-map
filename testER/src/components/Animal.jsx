import React from 'react'
import TrackButton from './TrackButton.jsx'
import LocButton from './LocButton.jsx'
import './Legend.css'

import storyIcon from '../../public/images/button_icons/story-f.png'

/* eslint-disable react/prop-types */
const Animal = ({ animal, configData, animalOnLocClicked, onNameClick, displayStory, tracks }) => {
  const backgroundColor = { backgroundColor: animal.color }
  const animalId = animal.id + ' animal'
  let hover = 'hover'
  let animalName = 'animal-name '
  let display = { }
  let truncAnimalName = animal.name

  if (truncAnimalName.length > 15) {
    truncAnimalName = truncAnimalName.substring(0, 15) + '...'
  }

  let trackState = ''
  if (tracks !== undefined && tracks) {
    trackState = ' bold '
  }

  if (configData === undefined || !displayStory) {
    hover = 'default'
    animalName = ''
    display = { visibility: 'hidden' }
  }

  return (
    <>
      <div
        className='animal-legend-content' onClick={(e) => {
          const name = document.getElementById(animalId)
          const clicked = e.target

          if (name.classList.contains('animal-name') && clicked.id !== 'subject-track-button' &&
          clicked.id !== 'subject-location-button') {
            onNameClick([animal, configData.subjects[animal.id]])
            name.classList.toggle('animal-name')
            name.classList.toggle('hover')
          }
        }}
      >
        <div id='animal-color' style={backgroundColor} />
        <div
          className={'fit-content ' + animalName + hover} id={animalId}
        />
        <div id='animal-color' />
        <div className={'animal-name-bullet ' + animalName + hover} id={animalId}>
          <div id='animal-bullet'><div style={backgroundColor} /></div>
          <div
            className={'animal-name-style ' + hover + trackState}
            id={animal.name.replace(' ', '-')}
          >{truncAnimalName}
          </div>
        </div>
        <div id='track-buttons' className={hover}>
          <TrackButton subject={animal} trackState={tracks} />
          <LocButton
            subject={animal}
            handleOnLocButtonClicked={animalOnLocClicked}
          />
        </div>
        <img id='story-button' className={hover} style={display} width='7px' height='10px' src={storyIcon} />
      </div>
    </>
  )
}

export default Animal
