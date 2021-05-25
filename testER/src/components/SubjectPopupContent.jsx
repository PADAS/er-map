import React from 'react'
import './Popup.css'
import './Legend.css'
import TrackButton from './TrackButton.jsx'

/* eslint-disable react/prop-types */
const SubjectPopup = (props) => {
  // TODO: detailed handling of missing data fields
  const data = props.subjectData
  const subject = props.subject
  const { legendOpen, onLegendStateToggle } = props

  let sex = ''
  if (subject.sex != undefined) {
    sex = subject.sex.charAt(0).toUpperCase() + subject.sex.slice(1) + ' | '
  }

  let species
  if (subject.common_name == null) {
    species = subject.subject_subtype.replace(/\b\w/g, l => l.toUpperCase())
  } else {
    species = subject.common_name.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
  }
  let date = subject.last_position.properties.DateTime
  console.log(date)
  date = date.substring(0, 10) + ' ' + date.substring(11, 16)

  let display = { display: 'flex' }
  if (!subject.display_story) {
    display = { display: 'none' }
  }

  function returnImage () {
    if (data && data.pictures.length > 0) {
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
        <TrackButton
          subject={subject}
        />
      </div>

      {/* <div id='pop-up-header'>
        <div>
          <h2>{subject.name}</h2>
        </div>
        <div className="popup-track">
          <TrackButton
              subject={subject}
              buttonTrack={props.track}
              buttonOnTrackClicked={props.onTrackClick}
              buttonOnLocClicked={props.popupOnLocClicked}
            />
        </div>
      </div>
      <div id='pop-up-info'>
        <p>{subject.last_position.properties.DateTime && new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'long',
          day: '2-digit',
          hour: 'numeric',
          minute: 'numeric'
        }).format(new Date(subject.last_position.properties.DateTime))}
        </p>
        <p>{subject.last_position.geometry.coordinates}</p>
      </div>
      {data &&
        <div id='pop-up-image'>
          <div dangerouslySetInnerHTML={{ __html: data.detail_description }} />
          {data.pictures.map((pic) => {
            return <img className='' key={pic} src={pic.path} height={200} width={200} alt='picture' />
          })}
          <p onClick={() => props.onStoryClick(subject)}>View my story</p>
        </div>} */}
    </div>
  )
}

export default SubjectPopup
