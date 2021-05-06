import React, { useContext, useState } from 'react'
import './Legend.css'

/* eslint-disable react/prop-types */
const HelpButton = () => {
  const imgOffSrc = '/public/images/button_icons/tips-gray.png'
  const imgOnSrc = '/public/images/button_icons/tips-green.png'
  const closeIconSrc = '/public/images/button_icons/close-icon.png'
  const [iconSrc, setIconSrc] = useState(imgOffSrc)

  return (
  <div id='tips-container'>
    <div id='tips-button-container' className='hover' onClick={() => {
      let tips = document.getElementById('tips')
      tips.classList.toggle('hidden')
      if (iconSrc === imgOffSrc) {
        setIconSrc(imgOnSrc);
      } else {
        setIconSrc(imgOffSrc);
      }
    }}>
      <img id='help-button' src={iconSrc}/>
    </div>
    <div id='tips' className='hidden'>
      <div>
        <h2>Helpful Tips</h2>
        <img id='close-icon' src={closeIconSrc} onClick={() => {
          if (iconSrc === imgOffSrc) {
            setIconSrc(imgOnSrc);
          } else {
            setIconSrc(imgOffSrc);
          }

          let tips = document.getElementById('tips')
          tips.classList.add('hidden')
        }}/>
      </div>
      <ul>
        <li>To tilt the map, press the control key (Mac) or ?? key (Windows)</li>
        <li>To set the map back... etc</li>
        <li>Other helpful tips here</li>
      </ul>
    </div>
  </div>
)}

export default HelpButton
