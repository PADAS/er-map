import React from 'react'
import './Popup.css'
import './Legend.css'
import TrackButton from './TrackButton.jsx'

/* eslint-disable react/prop-types */
const SubjectPopup = (props) => {
  // TODO: detailed handling of missing data fields
  // Qs: dateTime format (dateTime is download time, same for all -> needed?)? lat/long format? subject name in JSON? how to format multiple images?
  // add: position in lat/long?, common name
  const data = props.subjectData
  const subject = props.subject

  const sex = subject.sex.charAt(0).toUpperCase() + subject.sex.slice(1)
  let species
  if (subject.common_name == null) {
    species = subject.subject_subtype.replace(/\b\w/g, l => l.toUpperCase())
  } else {
    species = subject.common_name.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
  }
  let date = subject.last_position.properties.DateTime
  date = date.substring(5, 10) + '-' + date.substring(2, 4) + ' ' + date.substring(11, 16)

  let display = { display: 'block' }
  if (!subject.display_story) {
    display = { display: 'none' }
  }

  function returnImage () {
    if (data !== undefined && data.pictures.length > 0) {
      return <img className='pop-up-image' src={data.pictures[0].path} alt='picture' />
    }
  }

  return (
    <div id='pop-up'>

      <div>
        {/* data.pictures.map((pic) => {
          return <img className='pop-up-image' key={pic} src={pic.path} alt='picture' />
        }) */}
        {returnImage()}
      </div>
      <div id='pop-up-header'>
        <h3>{subject.name}</h3>
      </div>
      <p>{sex} | Adult | {species}</p>
      <p><i>Short, fun fact about {subject.name}</i></p>
      <div id='pop-up-buttons'>
        <p id='date'>{date}</p>
        <TrackButton
          subject={subject}
        />
        <img width='30' id='story' style={display} className='hover' src='/public/images/button_icons/story-f.png' onClick={() => props.onStoryClick([subject, data])} />
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
