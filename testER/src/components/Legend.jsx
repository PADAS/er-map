import React, { useState } from 'react'
import './Legend.css'
import Animal from './Animal.jsx'

/* eslint-disable react/prop-types */
const Legend = ({ subs, subjectData, onLocClick, legSub, onReturnClick, onStoryClick, legendOpen, onLegendStateToggle }) => {
  var l = document.getElementById('legend')
  const legImage = legendOpen ? "./public/images/button_icons/double_caret-right.png" : "/public/images/button_icons/double_caret-left.png";

  function toggleLegend () {
    onLegendStateToggle()
  }

  function display () {
    // console.log(legSub)
    if (legSub === undefined) {
      return (
        <div id='legend-content'>
          <div className='title'>
              <div id="earthranger-logo">
                <a href='https://earthranger.com/' className='earthranger-logo'>
                  <img src='./public/images/LogoEarthRanger.png' />
                </a>
              </div>
              <div id="tracker">
                {/* <p id="tracker">Animal Tracker</p> */}
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
                  />
                </div>
              ))}
          </div>
        </div>
      )
    } else {
      // setLeg(true)
      // l.style.width = '325px'

      // should toggle open if legend is closed when click on popup

      return (
        <>
          <div id='legend-content'>
            <div className='title'>
                <div id="earthranger-logo">
                  <a href='https://earthranger.com/' className='earthranger-logo'>
                    <img src='./public/images/LogoEarthRanger.png' />
                  </a>
                </div>
                <div id="tracker">
                  {/* <p id="tracker">Animal Tracker</p> */}
                  <p>Animal Tracker</p>
                </div>
            </div>
            <div onClick={() => onReturnClick(undefined)} id='return' className='hover'>
              <img src="./public/images/button_icons/view-animals-caret-left.png"/>
              View all Tracked Animals
            </div>
            <div id='subject-div'>
              <Animal animal={legSub[0]} key={legSub[0].id} animalOnLocClicked={onLocClick} />
            </div>
            {/* <h2>{legSub[0].name}</h2> */}
            {legSub[1].pictures.map((pic) => {
              return <img className='sub-image' key={pic} src={pic.path} height={200} width={200} alt='picture' />
            })}
            <div id='sub-content' className='default'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam nisi in porro quia quae.
              Aspernatur labore nobis veniam. Quisquam optio ipsam laudantium alias, dolorum amet qui.
              Adipisci obcaecati veniam libero? Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Recusandae libero molestias vero reprehenderit, harum quaerat placeat dignissimos sunt inventore
              voluptatibus esse repellat adipisci dolore. Tenetur quis consequatur et corporis nam?
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam nisi in porro quia quae.
              Aspernatur labore nobis veniam. Quisquam optio ipsam laudantium alias, dolorum amet qui.
              Adipisci obcaecati veniam libero? Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Recusandae libero molestias vero reprehenderit, harum quaerat placeat dignissimos sunt inventore
              voluptatibus esse repellat adipisci dolore. Tenetur quis consequatur et corporis nam?
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam nisi in porro quia quae.
              Aspernatur labore nobis veniam. Quisquam optio ipsam laudantium alias, dolorum amet qui.
              Adipisci obcaecati veniam libero? Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Recusandae libero molestias vero reprehenderit, harum quaerat placeat dignissimos sunt inventore
              voluptatibus esse repellat adipisci dolore. Tenetur quis consequatur et corporis nam?
            </div>
            {/* <div dangerouslySetInnerHTML={{ __html: legSub[1].detail_description }} /> */}
            {/* <div>Donate Now</div> */}
          </div>
        </>
      )
    }
  }

  return (
    <>
      <div id='legend' className={legendOpen ? "legend-open" : "legend-close"}>
        <div id='legend-open-button' onClick={() => toggleLegend()}>
          <img src={legImage}/>
        </div>
        {display()}
      </div>
    </>
  )
}

export default Legend
