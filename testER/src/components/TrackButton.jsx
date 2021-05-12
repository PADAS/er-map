import React, { useContext } from 'react'
import { TrackContext } from '../App'
import './Legend.css'

/* eslint-disable react/prop-types */
const TrackButton = ({ subject }) => {
  const { displayTracks, setTracks, tracks } = useContext(TrackContext)

  const vis = !!tracks[subject.id]
  const imgSrc = vis ? '/public/images/button_icons/pin_tracks-green.png' : '/public/images/button_icons/pin_tracks-gray.png'

  const onTrackButtonClick = () => {
    const update = [subject.id, !vis]
    const newState = Object.assign({}, tracks)
    newState[update[0]] = update[1]
    setTracks(newState)

    let pTags = document.querySelectorAll('#' + subject.name);
    /*let pTag = document.getElementById(subject.name)
    pTag.classList.toggle("bold")*/
    for (let i = 0; i < pTags.length; i++) {
        pTags[i].classList.toggle('bold')
    }

    displayTracks(update)
  }

  return <img width='30' height='30' className='hover' src={imgSrc} id='subject-track-button' onClick={onTrackButtonClick} />
}

export default TrackButton
