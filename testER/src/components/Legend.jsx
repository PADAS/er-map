import React, { useState } from 'react'
import './Legend.css'
import Animal from './Animal.jsx'

/* eslint-disable react/prop-types */
const Legend = ({ subs, track, onTrackClick, onLocClick, legSub, onReturnClick }) => {
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

  function display () {
    console.log(legSub)
    if (legSub === undefined) {
      return (
        <div id='legend-content'>
          {/* // map all content  */}
          {subs === undefined ? <div />
            : subs.map((s) => (
              <Animal animal={s} animalTrack={track} animalOnTrackClicked={onTrackClick} key={s.id} animalOnLocClicked={onLocClick} />
            ))}
        </div>
      )
    } else {
      return (
        <>
          <div>
            <div onClick={() => onReturnClick(undefined)}>Return</div>
            <h2>{legSub[0].name}</h2>
            {legSub[1].pictures.map((pic) => {
              return <img className='' key={pic} src={pic.path} height={200} width={200} alt='picture' />
            })}
            <div dangerouslySetInnerHTML={{ __html: legSub[1].detail_description }} />
            <div>Donate Now</div>
          </div>
        </>
      )
    }
  }

  return (
    <>
      <div id='legend'>
        <div id='legend-open-button' onClick={() => toggleLegend()}>
          LEGEND
        </div>
        {display()}
        {/* <div id='legend-content'> */}
        {/* // map all content  */}
        {/* {subs === undefined ? <div />
            : subs.map((s) => (
              <Animal animal={s} animalTrack={track} animalOnTrackClicked={onTrackClick} key={s.id} animalOnLocClicked={onLocClick} />
            ))}
        </div> */}
      </div>
    </>
  )
}

export default Legend
