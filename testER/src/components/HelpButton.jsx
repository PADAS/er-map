import React, { useState } from 'react'
import './Legend.css'

/* eslint-disable react/prop-types */
const HelpButton = () => {
  const imgOffSrc = `${process.env.PUBLIC_URL}/images/button_icons/tips-gray.png`
  const imgOnSrc = `${process.env.PUBLIC_URL}/images/button_icons/tips-green.png`
  const closeIconSrc = `${process.env.PUBLIC_URL}/images/button_icons/close-icon.png`
  const [iconSrc, setIconSrc] = useState(imgOffSrc)

  const storyStyle = { paddingLeft: '9px', paddingRight: '8px', marginTop: '5px' }
  const ctrlStyle = { marginTop: '6px' }
  const zoomStyle = { paddingLeft: '2px' }
  const viewStyle = { marginBottom: '2px', marginTop: '0px' }
  const zoomPStyle = { marginTop: '10px' }
  const orientStyle = { marginTop: '8px' }

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
        <div id='actual-tips'>
          <div>
            <img width='20' height='40' style={zoomStyle} src={`${process.env.PUBLIC_URL}/images/button_icons/tip-zoom.png`} />
            <p style={zoomPStyle}>Zoom map in/out</p>
          </div>
          <div>
            <img width='24' style={orientStyle} height='24' src={`${process.env.PUBLIC_URL}/images/button_icons/tip-reset.png`} />
            <p style={viewStyle}>Return map orientation to original view</p>
          </div>
          <div>
            <img width='24' height='24' style={ctrlStyle} src={`${process.env.PUBLIC_URL}/images/button_icons/tip-control_key.png`} />
            <p style={viewStyle}>Hold Ctrl / control key and drag with mouse to rotate view</p>
          </div>
          <div>
            <img width='24' height='24' src={`${process.env.PUBLIC_URL}/images/button_icons/map_pin-gray.png`} />
            <p>Jump to a subject's location</p>
          </div>
          <div>
            <img width='24' height='24' src={`${process.env.PUBLIC_URL}/images/button_icons/pin_tracks-gray.png`} />
            <p>Display a subject's track</p>
          </div>
          <div>
            <img width='7' height='10' style={storyStyle} src={`${process.env.PUBLIC_URL}/images/button_icons/story-f.png`} />
            <p>Display a subject's story</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpButton
