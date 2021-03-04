import React, { useState } from 'react'
import './Legend.css'

const ButtonContainer = ({ track_visibility, onTrackClickedButton }) => {

    var startingPoint

    console.log(track_visibility)

    if (track_visibility) {
        startingPoint = "./public/images/tracks_on.svg"
    } else {
        startingPoint = "./public/images/tracks_off.svg"
    }

    var [tracks, setTracks] = useState(startingPoint)

    function toggleTracks () {
        if (track_visibility) {
            startingPoint = "./public/images/tracks_off.svg"
        } else {
            startingPoint = "./public/images/tracks_on.svg"
        }
        setTracks(startingPoint)

        console.log(track_visibility)
        // send change back to Animal --> Parent 
        onTrackClickedButton(!track_visibility)
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
