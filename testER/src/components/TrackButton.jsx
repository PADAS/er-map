import React, { useState } from 'react'
import './Legend.css'

/* eslint-disable react/prop-types */
const TrackButton = ({ subject, buttonTrack, handleOnTrackButtonClicked }) => {
  var startingPoint = (buttonTrack[subject.id]) ? '/public/images/button_icons/pin_tracks-green.png' : '/public/images/button_icons/pin_tracks-gray.png'

  var [tracks, setTracks] = useState(startingPoint)
  var [vis, setVis] = useState(buttonTrack[subject.id])

  function toggleTracks () {
    setVis(!vis)
    startingPoint = vis ? '/public/images/button_icons/pin_tracks-gray.png' : '/public/images/button_icons/pin_tracks-green.png'
    setTracks(startingPoint)
    handleOnTrackButtonClicked([subject.id, !vis])
  }

  return (
    <>
      <img width='30' className='hover' src={tracks} id='subject-track-button' onClick={() => toggleTracks()} />
    </>
  )
}

export default TrackButton
