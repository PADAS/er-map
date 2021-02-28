/* eslint-disable react/prop-types */
import React from 'react'

const SubjectPopup = (props) => {
  // TODO: image, buttons (toggle tracks, go to icon), link to story?
  return (
    <div>
      <p><b>{props.subject.name}</b></p>
      <p>{props.subject.last_position.geometry.coordinates}</p>
    </div>)
}

export default SubjectPopup
