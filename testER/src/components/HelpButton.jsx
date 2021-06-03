import React, { useState } from 'react'
import './Legend.css'

import tipsOn from '../../public/images/button_icons/tips-gray.png'
import tipsOff from '../../public/images/button_icons/tips-green.png'
import close from '../../public/images/button_icons/close-icon.png'
import zoom from '../../public/images/button_icons/tip-zoom.png'
import reset from '../../public/images/button_icons/tip-reset.png'
import control from '../../public/images/button_icons/tip-control_key.png'
import pin from '../../public/images/button_icons/map_pin-gray.png'
import tracks from '../../public/images/button_icons/pin_tracks-gray.png'
import story from '../../public/images/button_icons/story-f.png'

/* eslint-disable react/prop-types */
const HelpButton = () => {
  const imgOffSrc = tipsOn
  const imgOnSrc = tipsOff
  const closeIconSrc = close
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
            <img width='20' height='40' style={zoomStyle} src={zoom} />
            <p style={zoomPStyle}>Zoom map in/out</p>
          </div>
          <div>
            <img width='24' style={orientStyle} height='24' src={reset} />
            <p style={viewStyle}>Return map orientation to original view</p>
          </div>
          <div>
            <img width='24' height='24' style={ctrlStyle} src={control} />
            <p style={viewStyle}>Hold Ctrl / control key and drag with mouse to rotate view</p>
          </div>
          <div>
            <img width='24' height='24' src={pin} />
            <p>Jump to a subject's location</p>
          </div>
          <div>
            <img width='24' height='24' src={tracks} />
            <p>Display a subject's track</p>
          </div>
          <div>
            <img width='7' height='10' style={storyStyle} src={story} />
            <p>Display a subject's story</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpButton
