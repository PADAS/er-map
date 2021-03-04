import React from 'react'

/* eslint-disable react/prop-types */
const SubjectPopup = (props) => {
  // TODO: toggle tracks button
  // TODO: handle undefine subjectData - defaul content (test w/ rangers)
  // TODO: scroll popup if too long
  // add: position in lat/long?, common name, date/time of capture
  console.log(props.subjectData)
  const data = props.subjectData
  return (
    <div>
      <p><b>{props.subject.name}</b></p>
      <p>{props.subject.last_position.geometry.coordinates}</p>
      <div dangerouslySetInnerHTML={{ __html: data.detail_description }} />
      {data.pictures.map((pic) => {
        return <img key={pic} src={pic.path} height={200} width={200} alt='picture' />
      })}
      <p><a href={data.more_info_path}>View my story</a></p>
    </div>)
}

export default SubjectPopup
