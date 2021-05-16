import React, { useContext } from 'react'
import { TrackContext } from '../App'
import './Legend.css'

/* eslint-disable react/prop-types */
const TrackButton = ({ subject, trackState, setTrackState }) => {
  const { displayTracks, setTracks, tracks } = useContext(TrackContext)

  const vis = !!tracks[subject.id]
  const imgSrc = vis ? '/public/images/button_icons/pin_tracks-green.png' : '/public/images/button_icons/pin_tracks-gray.png'

  const onTrackButtonClick = () => {
    const update = [subject.id, !vis]
    let newState = Object.assign({}, tracks)
    newState[update[0]] = update[1]
    setTracks(newState)

    if (trackState[subject.id] === ' bold ') {
      newState = Object.assign({}, trackState)
      newState[subject.id] = ''
      setTrackState(newState)
    } else {
      newState = Object.assign({}, trackState)
      newState[subject.id] = ' bold '
      setTrackState(newState)
    }

    displayTracks(update)
  }

  return <img width='20' height='20' className='hover' src={imgSrc} id='subject-track-button' onClick={onTrackButtonClick} />
}

export default TrackButton
