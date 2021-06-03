import React, { useContext } from 'react'
import { TrackContext } from '../App'
import './Legend.css'

/* eslint-disable react/prop-types */
const TrackButton = ({ subject }) => {
  const { displayTracks, setTracks, tracks } = useContext(TrackContext)

  const vis = !!tracks[subject.id]
  const imgSrc = vis ? `${process.env.PUBLIC_URL}/images/button_icons/pin_tracks-green.png` : `${process.env.PUBLIC_URL}/images/button_icons/pin_tracks-gray.png`

  const onTrackButtonClick = () => {
    const update = [subject.id, !vis]
    const newState = Object.assign({}, tracks)
    newState[update[0]] = update[1]
    setTracks(newState)
    displayTracks(update)
  }

  return <img width='24' height='24' className='hover' src={imgSrc} id='subject-track-button' onClick={onTrackButtonClick} />
}

export default TrackButton
