import React, { useState } from 'react'
import './Legend.css'

/* eslint-disable react/prop-types */
const ButtonContainer = ({ subject, buttonTrack, buttonOnTrackClicked, buttonOnLocClicked }) => {
  var startingPoint = (buttonTrack[subject.id]) ? '/public/images/tracks_on.svg' : '/public/images/tracks_off.svg'

  var [tracks, setTracks] = useState(startingPoint)
  var [vis, setVis] = useState(buttonTrack[subject.id])

  function toggleTracks () {
    setVis(!vis)
    startingPoint = vis ? '/public/images/tracks_off.svg' : '/public/images/tracks_on.svg'
    setTracks(startingPoint)
    buttonOnTrackClicked([subject.id, !vis])
  }

  function flyTo () {
    buttonOnLocClicked(subject.last_position.geometry.coordinates)
  }

  return (
    <>
      <div id='button-container'>
        <img src={tracks} id='subject-track-button' onClick={() => toggleTracks()} />
        <img src='./public/images/marker-feed.svg' id='subject-location-button' onClick={() => flyTo()} />
      </div>
    </>
  )
}

export default ButtonContainer
