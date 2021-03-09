import React, { useState } from 'react'
import './Legend.css'

/* eslint-disable react/prop-types */
const LocButton = ({ subject, buttonOnLocClicked }) => {

  function flyTo () {
    buttonOnLocClicked(subject.last_position.geometry.coordinates)
  }

  return (
    <>
        <img src='./public/images/marker-feed.svg' id='subject-location-button' onClick={() => flyTo()} />
    </>
  )
}

export default LocButton
