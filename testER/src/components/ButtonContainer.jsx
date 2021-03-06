import React, { useState } from 'react'
import './Legend.css'

const ButtonContainer = ({ buttonTrack, buttonOnTrackClicked}) => {

    var startingPoint = buttonTrack ? "/public/images/tracks_on.svg" : "/public/images/tracks_off.svg"

    var [tracks, setTracks] = useState(startingPoint)
    var [vis, setVis] = useState(buttonTrack)

    function toggleTracks () {
        setVis(!vis)
        startingPoint = vis ? "/public/images/tracks_off.svg" : "/public/images/tracks_on.svg"
        setTracks(startingPoint)
        // buttonOnTrackClicked(!buttonTrack)
    }

    return (
        <>
            <div id='button-container'>
                <img src={tracks} id='subject-track-button' onClick={() => toggleTracks()}/>
                <img src='./public/images/marker-feed.svg' id='subject-location-button' />
            </div>
        </>
    )
}

export default ButtonContainer
