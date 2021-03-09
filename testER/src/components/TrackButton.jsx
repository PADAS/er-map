import React, { useState } from 'react'
import './Legend.css'

/* eslint-disable react/prop-types */
const TrackButton = ({ subject, buttonTrack, buttonOnTrackClicked }) => {
  var startingPoint = (buttonTrack[subject.id]) ? '/public/images/tracks_on.svg' : '/public/images/tracks_off.svg'

  var [tracks, setTracks] = useState(startingPoint)
  var [vis, setVis] = useState(buttonTrack[subject.id])

  function toggleTracks () {
    setVis(!vis)
    startingPoint = vis ? '/public/images/tracks_off.svg' : '/public/images/tracks_on.svg'
    setTracks(startingPoint)
    buttonOnTrackClicked([subject.id, !vis])
  }

  return (
    <>
        <img src={tracks} id='subject-track-button' onClick={() => toggleTracks()} />
    </>
  )
}

export default TrackButton
