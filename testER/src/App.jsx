import React, { useEffect } from 'react'
import ReactGA from 'react-ga'
import mapboxgl from 'mapbox-gl'
import ReactDOM from 'react-dom'
import SubjectPopup from './components/Popup'

import './App.css'
import 'mapbox-gl/dist/mapbox-gl.css'

// instantiate the Map
mapboxgl.accessToken = 'pk.eyJ1IjoidmpvZWxtIiwiYSI6ImNra2hiZXNpMzA1bTcybnA3OXlycnN2ZjcifQ.gH6Nls61WTMVutUH57jMJQ' // development token
var GlobalMap
var config

function mapSubjects () {
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
      resp.data.data.map((subject) => drawIcon(subject)) // looping through array of subjects
    })
    .catch(console.error)
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
        ReactDOM.render(<SubjectPopup subject={json} subjectData={config.subjects[json.id]} />, placeholder)

        new mapboxgl.Popup()
          .setDOMContent(placeholder)
          .setLngLat(coordinates)
          .addTo(GlobalMap)
      })

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

/* eslint-disable react/prop-types */
const App = (props) => {
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
        }
      })
    // Cancel the subscription to useEffect().
    return function cleanup () {
      isSubscribed = false
    }
  })

  // TODO: use config data for initial map
  useEffect(() => {
    // set up google analytics
    const trackingId = 'UA-128569083-10' // Google Analytics tracking ID
    ReactGA.initialize(trackingId)
    ReactGA.pageview(window.location.pathname + window.location.search)

    GlobalMap = new mapboxgl.Map({
      container: 'map-container', // container ID
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [-109.3666652, -27.1166662], // starting position [lng, lat]
      zoom: 11 // starting zoom
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

      mapSubjects()
    })
  }, [])

  return (
    <>
      <div id='map-container'>
        <a href='https://earthranger.com/'>
          <img src='./public/images/LogoEarthRanger.png' id='earth-ranger-logo' />
        </a>
      </div>
    </>
  )
}

export default App
