import React, { useEffect } from 'react'
import ReactGA from 'react-ga'
import mapboxgl from 'mapbox-gl'
import './App.css'
import 'mapbox-gl/dist/mapbox-gl.css'

// instantiate the Map
mapboxgl.accessToken = 'pk.eyJ1IjoidmpvZWxtIiwiYSI6ImNra2hiZXNpMzA1bTcybnA3OXlycnN2ZjcifQ.gH6Nls61WTMVutUH57jMJQ' // development token
var GlobalMap

function mapSubjects () {
  const url = 'http://localhost:5000/api/v1.0/subjects'
  fetch(url)
    .then(resp => {
      console.log(resp)
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
    }
  )
}

// point_count and cluster layer
// filter, detemrine radius
// as zoom, hide individual icon, covered by cluster radius/layer

const App = () => {
  useEffect(() => {
    const trackingId = '258434087' // Google Analytics tracking ID
    ReactGA.initialize(trackingId)
    ReactGA.event({
      category: 'Map',
      action: 'Loaded'
    })

    GlobalMap = new mapboxgl.Map({
      container: 'map-container', // container ID
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [-109.3666652, -27.1166662], // starting position [lng, lat]
      zoom: 14 // starting zoom
    })

    var nav = new mapboxgl.NavigationControl();
    GlobalMap.addControl(nav, 'top-left');

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
