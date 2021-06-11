import React from 'react'
import './Legend.css'

import pin from '../../public/images/button_icons/map_pin-gray.png'

/* eslint-disable react/prop-types */
const LocButton = ({ subject, handleOnLocButtonClicked }) => {
  function flyTo () {
    handleOnLocButtonClicked(subject.last_position.geometry.coordinates)
  }

  return (
    <>
      <img
        width='24' height='24' className='hover' src={pin}
        id='subject-location-button' onClick={() => flyTo()}
      />
    </>
  )
}

export default LocButton
