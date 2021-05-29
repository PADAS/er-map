import React from 'react'
import './Legend.css'
import TrackButton from './TrackButton.jsx'

/* eslint-disable react/prop-types */
const SubjectPopup = (props) => {
  // TODO: detailed handling of missing data fields
  const data = props.subjectData
  const subject = props.subject
  const { legendOpen, onLegendStateToggle } = props

  let sex = ''
  if (subject.sex !== undefined) {
    sex = subject.sex.charAt(0).toUpperCase() + subject.sex.slice(1) + ' | '
  }

  let species
  if (subject.common_name === null) {
    species = subject.subject_subtype.replace(/\b\w/g, l => l.toUpperCase())
  } else {
    species = subject.common_name.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
  }
  let date = subject.last_position.properties.DateTime
  date = date.substring(0, 10) + ' ' + date.substring(11, 16)

  let display = { display: 'flex' }
  if (!subject.display_story) {
    display = { display: 'none' }
  }

  function returnImage () {
    if (data !== undefined && data.pictures !== undefined && data.pictures.length > 0) {
      return <img className='pop-up-image' src={data.pictures[0].path} alt='picture' />
    }
  }

  const handleStoryClick = () => {
    props.onStoryClick([subject, data])
    if (!legendOpen) {
      onLegendStateToggle()
    }
  }

  return (
    <div id='pop-up'>

      <div>
        {returnImage()}
      </div>
      <div id='pop-up-header'>
        <h3>{subject.name}</h3>
      </div>
      <p>{sex}{data && data.age && data.age + ' |'} {species}</p>
      {data && data.fun_fact && <p><i>{data.fun_fact}</i></p>}
      <div onClick={handleStoryClick} className='hover' style={display} id='view-story-button'>
        <p>View my story</p>
        <img height='10' id='story' src='/public/images/button_icons/caret-right-orange.png' />
      </div>
      <div id='pop-up-buttons'>
        <p id='date'>{date}</p>
        <TrackButton subject={subject} />
      </div>
    </div>
  )
}

export default SubjectPopup
