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
      <div id='animal-legend-content' className={hover} onClick={() => {
        const name = document.getElementById(animalId)

        if (name.classList.contains('animal-name')) {
          onNameClick([animal, configData.subjects[animal.id]])
          name.classList.toggle('animal-name')
          name.classList.toggle('hover')
        }
      }}>
        <div id='animal-color' /*style={backgroundColor}*/ />
        <div className={'animal-name-bullet ' + animalName + hover} id={animalId}>
          <ul id='ul-list'>
          <li id="animal-bullet" style={bulletColor}><p className={hover} id='animal-name-p'>{animal.name}</p></li>
          </ul>
        </div>
        <div id='track-buttons'>
          <TrackButton
            subject={animal}
          />
          <LocButton
            subject={animal}
            handleOnLocButtonClicked={animalOnLocClicked}
          />
        </div>
        <img id='story-button' style={display} src='/public/images/button_icons/story-f.png'/>

      </div>
    </>
  )
}

export default Animal
