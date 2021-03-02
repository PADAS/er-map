import React, { useState } from 'react'
import './Legend.css'
import Animal from './Animal.jsx'

var data = [{ name: 'joe' }, { name: 'jane' }, { name: 'joe' }, { name: 'jane' },
  { name: 'joe' }, { name: 'jane' }, { name: 'joe' }, { name: 'jane' },
  { name: 'joe' }, { name: 'jane' }, { name: 'joe' }, { name: 'jane' }]

const Legend = ({ subs }) => {

  console.log(subs)

  return (
    <>
      <div id='legend'>
        <div id='legend-open-button'>
          LEGEND
        </div>
        <div id='legend-content'>
          {/* // map all content  */}
          {subs === undefined ? <div></div> :
          subs.map((s) => (
            <Animal mes={s} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Legend
