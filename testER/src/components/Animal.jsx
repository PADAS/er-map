import React from 'react'
import TrackButton from './TrackButton.jsx'
import LocButton from './LocButton.jsx'
import './Legend.css'

/* eslint-disable react/prop-types */
const Animal = ({
  animal, configData,
  animalOnLocClicked, onNameClick, displayStory
}) => {
  const backgroundColor = { backgroundColor: animal.color }
  const bulletColor = { color: animal.color }
  const animalId = animal.id + ' animal'
  let hover = 'hover'
  let animalName = 'animal-name '
  let display = { }

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
          <ul id='ul-list'>
            <li id='animal-bullet' style={bulletColor}><p className={hover + ' animal-name-p'} id={animal.name}>{animal.name}</p></li>
          </ul>
        </div>
        <div id='track-buttons' className={hover}>
          <TrackButton
            subject={animal}
          />
          <LocButton
            subject={animal}
            handleOnLocButtonClicked={animalOnLocClicked}
          />
        </div>
        <img id='story-button' className={hover} style={display} src='/public/images/button_icons/story-f.png' />

      </div>
    </>
  )
}

export default Animal
