import React, {useState} from 'react'
import './Legend.css'
import Animal from './Animal.jsx'

/* eslint-disable react/prop-types */
const Legend = ({ subs, subjectData, onLocClick, legSub, onReturnClick, onStoryClick, legendOpen, onLegendStateToggle }) => {
  const legImage = legendOpen ? './public/images/button_icons/double_caret-right.png' : '/public/images/button_icons/double_caret-left.png'

  const [animalTrackState, setAnimalTrackState] = useState({})

  function toggleLegend () {
    onLegendStateToggle()
  }

  function setTrackState(newState) {
    setAnimalTrackState(newState)
  }

  function display () {
    if (legSub === undefined) {
      return (
        <div id='legend-content'>
          <div className='title'>
            <div id='earthranger-logo'>
              <a href='https://earthranger.com/' className='earthranger-logo'>
                <img src='./public/images/LogoEarthRanger.png' />
              </a>
            </div>
            <div id='tracker'>
              <p>Animal Tracker</p>
            </div>
          </div>
          <div id='subs'>
            {/* // map all content  */}
            {subs === undefined ? <div />
              : subs.map((s) => (
                <div key={s.id} id='subject-div'>
                  <Animal
                    animal={s} configData={subjectData}
                    key={s.id}
                    animalOnLocClicked={onLocClick} onNameClick={onStoryClick}
                    displayStory={s.display_story}
                    trackState={animalTrackState}
                    updateTrackState={setTrackState}
                  />
                </div>
              ))}
          </div>
        </div>
      )
    } else {
      // should toggle open if legend is closed when click on popup

      return (
        <>
          <div id='legend-content'>
            <div className='title'>
              <div id='earthranger-logo'>
                <a href='https://earthranger.com/' className='earthranger-logo'>
                  <img src='./public/images/LogoEarthRanger.png' />
                </a>
              </div>
              <div id='tracker'>
                <p>Animal Tracker</p>
              </div>
            </div>
            {/* <div id='animal-story'> */}
              <div onClick={() => onReturnClick(undefined)} id='return' className='hover'>
                <img width="7px" height="10px" src='./public/images/button_icons/view-animals-caret-left.png' />
                <p>Back</p>
              </div>
            <div id='animal-story'>
              <div id='subject-div'>
                <Animal animal={legSub[0]} key={legSub[0].id} animalOnLocClicked={onLocClick} />
              </div>
              {legSub[1].pictures.map((pic) => {
                return <img className='sub-image' key={pic} src={pic.path} height={200} width={200} alt='picture' />
              })}
              <div id='sub-content' className='default' dangerouslySetInnerHTML={{ __html: legSub[1].detail_description }} />
//             <div onClick={() => onReturnClick(undefined)} id='return' className='hover'>
//               <img  width="7px" height="10px" src='./public/images/button_icons/view-animals-caret-left.png' />
//               <p>Back</p>
//             </div>
// //             <div id='animal-story'>
//             <div id='subject-div'>
//               <Animal animal={legSub[0]} key={legSub[0].id} animalOnLocClicked={onLocClick}
//                 trackState={animalTrackState} updateTrackState={setTrackState}/>
            </div>
          </div>
        </>
      )
    }
  }

  return (
    <>
      <div id='legend' className={legendOpen ? 'legend-open' : 'legend-close'}>
        <div id='legend-open-button' onClick={() => toggleLegend()}>
          <img src={legImage} />
        </div>
        {display()}
      </div>
    </>
  )
}

export default Legend
