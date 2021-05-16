import React from 'react'
import './Legend.css'

/* eslint-disable react/prop-types */
const LocButton = ({ subject, handleOnLocButtonClicked }) => {
  function flyTo () {
    handleOnLocButtonClicked(subject.last_position.geometry.coordinates)
  }

  return (
    <>
      <img
        width='20' height='20' className='hover' src='/public/images/button_icons/map_pin-gray.png'
        id='subject-location-button' onClick={() => flyTo()}
      />
    </>
  )
}

export default LocButton
