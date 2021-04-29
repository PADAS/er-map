import React, { useContext } from 'react'
import './Legend.css'

/* eslint-disable react/prop-types */
const HelpButton = () => {
  const imgSrc = '/public/images/button_icons/tips-gray.png';

  return (
  <div id='tips-container'>
    <div id='tips-button-container' className='hover' onClick={() => {
      let tips = document.getElementById('tips')
      tips.classList.toggle('hidden')
    }}>
      <img id='help-button' src={imgSrc}/>
    </div>
    <div id='tips' className='hidden'>
      <h2>Helpful Tips</h2>
      <ul>
        <li>To tilt the map, press the control key (Mac) or ?? key (Windows)</li>
        <li>To set the map back... etc</li>
        <li>Other helpful tips here</li>
      </ul>
    </div>
  </div>
)}

export default HelpButton
