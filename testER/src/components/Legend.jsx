import React, { useState } from 'react'
import './Legend.css'
import Animal from './Animal.jsx'

/* eslint-disable react/prop-types */
const Legend = ({ subs, track, onTrackClick }) => {
  var [leg, setLeg] = useState(true)
  var l = document.getElementById('legend')

  function toggleLegend () {
    setLeg(!leg)
    if (leg) {
      l.style.width = '20px'
    } else {
      l.style.width = '260px'
    }
  }

  return (
    <>
      <div id='legend'>
        <div id='legend-open-button' onClick={() => toggleLegend()}>
          LEGEND
        </div>
        <div id='legend-content'>
          {/* // map all content  */}
          {subs === undefined ? <div />
            : subs.map((s) => (
              <Animal animal={s} animalTrack={track} animalOnTrackClicked={onTrackClick} key={s.id} />
            ))}
        </div>
      </div>
    </>
  )
}

export default Legend
