import React from 'react'

/* eslint-disable react/prop-types */
const SubjectPopup = (props) => {
  // TODO: toggle tracks button
  // TODO: scroll popup if too long
  // TODO: make sure popup stays within screen
  // TODO: detailed handling of missing data fields
  // Qs: dateTime format (dateTime is download time, same for all -> needed?)? lat/long format? subject name in JSON? how to format multiple images?
  // add: position in lat/long?, common name
  // TODO: styling
  const data = props.subjectData
  const subject = props.subject
  return (
    <div>
      <p><b>{subject.name}</b></p>
      <p>{subject.last_position.properties.DateTime && new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric'
      }).format(new Date(subject.last_position.properties.DateTime))}
      </p>
      <p>{subject.last_position.geometry.coordinates}</p>
      {data &&
        <div>
          <div dangerouslySetInnerHTML={{ __html: data.detail_description }} />
          {data.pictures.map((pic) => {
            return <img key={pic} src={pic.path} height={200} width={200} alt='picture' />
          })}
          <p><a href={data.more_info_path}>View my story</a></p>
        </div>}
    </div>)
}

export default SubjectPopup
