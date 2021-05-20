import React, { useState } from 'react'
import './Legend.css'

/* eslint-disable react/prop-types */
const HelpButton = () => {
  const imgOffSrc = '/public/images/button_icons/tips-gray.png'
  const imgOnSrc = '/public/images/button_icons/tips-green.png'
  const closeIconSrc = '/public/images/button_icons/close-icon.png'
  const [iconSrc, setIconSrc] = useState(imgOffSrc)

  const storyStyle = {'padding-left': '7px', 'padding-right': '6.5px'}

  return (
    <div id='tips-container'>
      <div
        id='tips-button-container' className='hover' onClick={() => {
          const tips = document.getElementById('tips')
          tips.classList.toggle('hidden')
          if (iconSrc === imgOffSrc) {
            setIconSrc(imgOnSrc)
          } else {
            setIconSrc(imgOffSrc)
          }
        }}
      >
        <img id='help-button' src={iconSrc} />
      </div>
      <div id='tips' className='hidden'>
        <div>
          <h2>Helpful Tips</h2>
          <img
            id='close-icon' src={closeIconSrc} onClick={() => {
              if (iconSrc === imgOffSrc) {
                setIconSrc(imgOnSrc)
              } else {
                setIconSrc(imgOffSrc)
              }

              const tips = document.getElementById('tips')
              tips.classList.add('hidden')
            }}
          />
        </div>
        <div id="actual-tips">
          <div>
            <img width='20' height='20' src={'/public/images/button_icons/pin_tracks-green.png'}/>
            <p>Zoom map in/out</p>
          </div>
          <div>
            <h4 style={storyStyle}>^</h4>
            <p>(Mac) Hold ^ key and drag with mouse to rotate view</p>
          </div>
          <div>
            <h4>Ctrl</h4>
            <p>(Windows) Hold Ctrl key and drag with mouse to rotate view</p>
          </div>
          <div>
            <img width='20' height='20' src={'/public/images/button_icons/pin_tracks-green.png'}/>
            <p>Return map orientation to original view</p>
          </div>
          <div>
            <img width='20' height='20' src='/public/images/button_icons/map_pin-gray.png'/>
            <p>Jump to a subject's location</p>
          </div>
          <div>
            <img width='20' height='20' src='/public/images/button_icons/pin_tracks-gray.png'/>
            <p>Display a subject's track</p>
          </div>
          <div>
            <img width='7' height='10' style={storyStyle} src='/public/images/button_icons/story-f.png'/>
            <p>Display a subject's story</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpButton
