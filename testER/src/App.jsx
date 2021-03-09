import React, { useEffect, useState } from 'react'
import ReactGA from 'react-ga'
import mapboxgl from 'mapbox-gl'
import ReactDOM from 'react-dom'
import SubjectPopup from './components/Popup'
import Legend from './components/Legend.jsx'

import './App.css'
import 'mapbox-gl/dist/mapbox-gl.css'

// instantiate the Map
mapboxgl.accessToken = 'pk.eyJ1IjoidmpvZWxtIiwiYSI6ImNra2hiZXNpMzA1bTcybnA3OXlycnN2ZjcifQ.gH6Nls61WTMVutUH57jMJQ' // development token
let GlobalMap
let config
const trackColors = ['#953ae4', '#000075', '#469990', '#800000', '#f58231', '#3cb44b', '#42d4f4',
  '#911eb4', '#e6194b', '#ffe119', '#4363d8', '#f032e6', '#9a6324', '#bfef45', '#f58231', '#808000']

/* eslint-disable react/prop-types */
const App = (props) => {
  var [subjects, setSubjects] = useState([])
  var [tracks, setTracks] = useState({})
  var [trackColorIndex, setTrackColorIndex] = useState(0)

  // TODO: detailed handling of missing config info
  function initMap () {
    // set up google analytics
    const trackingId = 'UA-128569083-10' // Google Analytics tracking ID
    ReactGA.initialize(trackingId)
    ReactGA.pageview(window.location.pathname + window.location.search)

    GlobalMap = new mapboxgl.Map({
      container: 'map-container', // container ID
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: config.map.center === undefined ? [-109.3666652, -27.1166662] : config.map.center, // starting position [lng, lat]
      zoom: config.map.zoom === undefined ? 11 : config.map.zoom // starting zoom
    })

    var nav = new mapboxgl.NavigationControl()
    GlobalMap.addControl(nav, 'top-left')

    GlobalMap.on('load', function () {
      // add the 3D terrain source
      GlobalMap.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 14
      })

      // add a sky layer that will show when the map is highly pitched
      GlobalMap.addLayer({
        id: 'sky',
        type: 'sky',
        paint: {
          'sky-type': 'atmosphere',
          'sky-atmosphere-sun': [0.0, 0.0],
          'sky-atmosphere-sun-intensity': 15
        }
      })

      // add 3D terrain
      GlobalMap.on('render', function () {
        // add the DEM source as a terrain layer with exaggerated height
        GlobalMap.setTerrain({ source: 'mapbox-dem', exaggeration: 3 })
      })

      // fetch call for subjects
      const url = 'http://localhost:5000/api/v1.0/subjects'
      fetch(url)
        .then(resp => {
          if (resp.ok) {
            return resp
          }
          throw Error('Error in request:' + resp.statusText)
        })
        .then(resp => resp.json()) // returns a json object
        .then(resp => {
          resp.data.data.map((subject) => { // setTracks(tracks[subject.id] = false)
            drawIcon(subject)
          }) // looping through array of subjects
          setSubjects(resp.data.data)
        })
        .catch(console.error)
    })
  }

  useEffect(() => {
    let isSubscribed = true
    // load configuration data
    fetch(props.configFile, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        if (isSubscribed) {
          config = json
          initMap()
        }
      })
    // Cancel the subscription to useEffect().
    return function cleanup () {
      isSubscribed = false
    }
  }, [])

  function displayTracks (updatedTrack) {
    const id = updatedTrack[0]
    const displayed = updatedTrack[1]

    const layer = GlobalMap.getLayer('LineString ' + id)

    if (displayed) {
      if (layer === undefined) {
        fetchTrack(id)
      } else {
        GlobalMap.setLayoutProperty('LineString ' + id, 'visibility', 'visible') // turn on visibility
      }
    } else {
      GlobalMap.setLayoutProperty('LineString ' + id, 'visibility', 'none') // turn off visibility
    }
  }

  // Draw tracks and add button component to display tracks
  function fetchTrack (subjectId) {
    const url = 'http://localhost:5000/api/v1.0/subject/' + subjectId + '/tracks'
    fetch(url)
      .then(resp => {
        if (resp.ok) {
          return resp
        }
        throw Error('Error in request:' + resp.statusText)
      })
      .then(resp => resp.json()) // returns a json object
      .then(resp => {
        drawTrack(resp.data)
      })
      .catch(console.error)
  }

  function drawTrack (json) {
    GlobalMap.addSource(json.features[0].geometry.type + ' ' + json.features[0].properties.id, {
      type: 'geojson',
      data: json
    })

    GlobalMap.addLayer({
      id: json.features[0].geometry.type + ' ' + json.features[0].properties.id,
      type: 'line',
      source: json.features[0].geometry.type + ' ' + json.features[0].properties.id,
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': trackColors[trackColorIndex],
        'line-width': 3
      }
    })

    if (trackColorIndex == 15) {
      setTrackColorIndex(0)
    } else {
      setTrackColorIndex(trackColorIndex + 1)
    }
  }

  function drawIcon (json) {
    GlobalMap.loadImage(json.last_position.properties.image,
      function (error, image) {
        if (error) throw error
        GlobalMap.addImage(json.subject_subtype + json.id, image)
        GlobalMap.addSource('point' + json.id, {
          type: 'geojson',
          data: json.last_position
        })
        GlobalMap.addLayer({
          id: 'points' + json.id,
          type: 'symbol',
          source: 'point' + json.id,
          layout: {
            'icon-image': json.subject_subtype + json.id,
            'icon-size': 1.0
          }
        })

        // bind popup to subject
        GlobalMap.on('click', 'points' + json.id, (e) => {
          var coordinates = e.features[0].geometry.coordinates.slice()

          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
          }

          const placeholder = document.createElement('div')
          ReactDOM.render(<SubjectPopup subject={json} subjectData={config.subjects[json.id]}
            track={tracks} onTrackClick={(updatedTrack) => displayTracks(updatedTrack)} />, placeholder)
          new mapboxgl.Popup()
            .setDOMContent(placeholder)
            .setLngLat(coordinates)
            .addTo(GlobalMap)
        })

        /*const placeholder = document.createElement('div')
        const name = document.createElement('p')
        name.textContent = json.name
        placeholder.appendChild(name);
        placeholder.classList.add('name')
        ReactDOM.render(<p className='name'>{json.name}</p>, placeholder)
        new mapboxgl.Popup({closeButton: false, offset: {bottom: [0, 50]}, className:'namePopup', closeOnClick: false})
          .setDOMContent(placeholder)
          .setLngLat(json.last_position.geometry.coordinates)
          .addTo(GlobalMap)*/

        // change mouse when hovering over a subject
        GlobalMap.on('mouseenter', 'points' + json.id, () => {
          GlobalMap.getCanvas().style.cursor = 'pointer'
        })
        GlobalMap.on('mouseleave', 'points' + json.id, () => {
          GlobalMap.getCanvas().style.cursor = ''
        })
      }
    )
  }

  function goToLoc (coords) {
    GlobalMap.flyTo({
      center: coords,
      essential: true
    })
  }

  return (
    <>
      <div id='map-container'>
        <a href='https://earthranger.com/'>
          <img src='./public/images/LogoEarthRanger.png' id='earth-ranger-logo' />
        </a>
        <Legend
          subs={subjects}
          track={tracks}
          onTrackClick={(updatedTrack) => {
            let newState = tracks
            newState[updatedTrack[0]] = updatedTrack[1]
            setTracks(newState)
            displayTracks(updatedTrack)
          }}
          onLocClick={(coords) => goToLoc(coords)}
        />
      </div>
    </>
  )
}

export default App
