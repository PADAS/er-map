import React, { useContext } from 'react'
import './Legend.css'

/* eslint-disable react/prop-types */
const HelpButton = () => {
  const imgSrc = '/public/images/button_icons/tips-gray.png';
  /*const { displayTracks, setTracks, tracks } = useContext(TrackContext)

  const vis = !!tracks[subject.id]
  const imgSrc = vis ? '/public/images/button_icons/pin_tracks-green.png' : '/public/images/button_icons/pin_tracks-gray.png'

  const onTrackButtonClick = () => {
    const update = [subject.id, !vis]
    const newState = Object.assign({}, tracks)
    newState[update[0]] = update[1]
    setTracks(newState)

    displayTracks(update)
  }*/

  return (
    <div id='test' className='hover' onClick={() => {
      console.log("clicked help button!")
    }}>
      <img id='help-button' src={imgSrc}/>
  </div>
)}

export default HelpButton
