import React, { useEffect, useState } from 'react'
import ReactGA from 'react-ga'
import mapboxgl from 'mapbox-gl'
import Legend from './components/Legend.jsx'
import './App.css'
import 'mapbox-gl/dist/mapbox-gl.css'

// instantiate the Map
mapboxgl.accessToken = 'pk.eyJ1IjoidmpvZWxtIiwiYSI6ImNra2hiZXNpMzA1bTcybnA3OXlycnN2ZjcifQ.gH6Nls61WTMVutUH57jMJQ' // development token
var GlobalMap

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
      fetchTrack(resp.data.data[0].id)
      resp.data.data.map((subject) => drawIcon(subject)) // looping through array of subjects
    })
    .catch(console.error)
}

function drawIcon (json) {
  //fetchTrack(json.id)
  /*<IconButton aria-label="delete" onClick={() => {
    alert('clicked')
  }}>Display Tracks</IconButton>*/

  /*GlobalMap.loadImage(json.last_position.properties.image,
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
    }
  )*/
}

// Draw tracks and add button component to display tracks
function fetchTrack (subject_id) {
  const url = 'http://localhost:5000/api/v1.0/subject/' + subject_id + '/tracks'
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
  console.log(json)
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
      'line-color': '#953ae4',
      'line-width': 3
    }
  })
}

// point_count and cluster layer
// filter, detemrine radius
// as zoom, hide individual icon, covered by cluster radius/layer

const App = () => {
  var [subjects, setSubjects] = useState([])

  useEffect(() => {
    const trackingId = 'UA-128569083-10' // Google Analytics tracking ID
    ReactGA.initialize(trackingId)
    ReactGA.pageview(window.location.pathname + window.location.search)
    ReactGA.event({
      category: 'Map',
      action: 'Loaded'
    })

    // fetch call for subjects
    const url = 'http://localhost:5000/api/v1.0/subjects'
    fetch(url)
      .then(resp => {
        // console.log(resp)
        if (resp.ok) {
          return resp
        }
        throw Error('Error in request:' + resp.statusText)
      })
      .then(resp => resp.json()) // returns a json object
      .then(resp => {
        resp.data.data.map((subject) => drawIcon(subject)) // looping through array of subjects
        setSubjects(resp.data.data)
      })
      .catch(console.error)

    GlobalMap = new mapboxgl.Map({
      container: 'map-container', // container ID
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [-109.3666652, -27.1166662], // starting position [lng, lat]
      zoom: 14 // starting zoom
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

      GlobalMap.on('render', function () {
        // add the DEM source as a terrain layer with exaggerated height
        GlobalMap.setTerrain({ source: 'mapbox-dem', exaggeration: 3 })
      })
    })
  }, [])

  return (
    <>
      <div id='map-container'>
        <a href='https://earthranger.com/'>
          <img src='./public/images/LogoEarthRanger.png' id='earth-ranger-logo' />
        </a>
        <Legend subs={subjects} />
      </div>
    </>
  )
}

export default App
