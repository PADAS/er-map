import React from 'react';
import './Legend.css';
import Animal from './Animal.jsx';

import doubleCaretRight from '../../public/images/button_icons/double_caret-right.png';
import doubleCaretLeft from '../../public/images/button_icons/double_caret-left.png';
import logo from '../../public/images/LogoEarthRanger.png';
import caretLeft from '../../public/images/button_icons/view-animals-caret-left.png';

/* eslint-disable react/prop-types */
const Legend = ({
  subs, subjectData, onLocClick, legSub, onReturnClick, onStoryClick,
  legendOpen, onLegendStateToggle, tracks, title
}) => {
  const legImage = legendOpen ? doubleCaretRight : doubleCaretLeft;

  function toggleLegend () {
    onLegendStateToggle();
  }

  function display () {
    if (legSub === undefined) {
      return (
        <div id='legend-content'>
          <div className='title'>
            <div id='earthranger-logo'>
              <a href='https://earthranger.com/' rel='noreferrer' target='_blank' className='earthranger-logo'>
                <img src={logo} />
              </a>
            </div>
            <div id='tracker'>
              <p>{title !== null ? title : 'Animal Tracker'}</p>
            </div>
          </div>
          <div id='subs'>
            {subs === undefined ? <div />
              : subs.map((s) => (
                <div key={s.id} id='subject-div'>
                  <Animal
                    animal={s} configData={subjectData}
                    key={s.id}
                    animalOnLocClicked={onLocClick} onNameClick={onStoryClick}
                    displayStory={s.display_story}
                    tracks={tracks[s.id]}
                  />
                </div>
              ))}
          </div>
        </div>
      );
    } else {
      return (
        <>
          <div id='legend-content'>
            <div className='title'>
              <div id='earthranger-logo'>
                <a href='https://earthranger.com/' className='earthranger-logo'>
                  <img src={logo} />
                </a>
              </div>
              <div id='tracker'>
                <p>{title !== null ? title : 'Animal Tracker'}</p>
              </div>
            </div>
            <div onClick={() => onReturnClick(undefined)} id='return' className='hover'>
              <img width='7px' height='10px' src={caretLeft} />
              <p>Back</p>
            </div>
            <div id='animal-story'>
              <div id='subject-div'>
                <Animal animal={legSub[0]} key={legSub[0].id} animalOnLocClicked={onLocClick} tracks={tracks[legSub[0].id]} />
              </div>
              {legSub[1].pictures.map((pic) => {
                return <img className='sub-image' key={pic} src={pic.path} height={200} width={200} alt='picture' />;
              })}
              <div id='sub-content' className='default' dangerouslySetInnerHTML={{ __html: legSub[1].detail_description }} />
            </div>
          </div>
        </>
      );
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
  );
};

export default Legend;
