import React, { useEffect } from 'react'
import ReactGA from 'react-ga'
import './App.css'
// import ReactMapboxGl, { MapContext, Image, Layer, Feature, Marker } from 'react-mapbox-gl'
import ReactMapboxGl, { MapContext } from 'react-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// instantiate the Map
const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoidmpvZWxtIiwiYSI6ImNra2hiZXNpMzA1bTcybnA3OXlycnN2ZjcifQ.gH6Nls61WTMVutUH57jMJQ' // development token
})
let GlobalMap

//
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
    // .then(console.log)
    .then(resp => {
      resp.data.data.map((subject) => drawIcon(subject)) // looping through array of subjects
    })
    .catch(console.error)
}

function drawIcon (json) {
// https://upload.wikimedia.org/wikipedia/commons/1/18/Orange_cat_cartoon.png
// https://sandbox.pamdas.org/static/ranger-red.svg
  GlobalMap.loadImage('https://upload.wikimedia.org/wikipedia/commons/1/18/Orange_cat_cartoon.png',
  // GlobalMap.loadImage(json['image_url'],
    function (error, image) {
      if (error) throw error
      GlobalMap.addImage(json.subject_subtype + json.id, image) // can change this line later (adding id makes image unique)
      GlobalMap.addSource('point' + json.id, {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: json.last_position.type,
              geometry: {
                type: json.last_position.geometry.type,
                coordinates: json.last_position.geometry.coordinates
              }
            }
          ]
        }
      })
      GlobalMap.addLayer({
        id: 'points' + json.id,
        type: 'symbol',
        source: 'point' + json.id,
        layout: {
          'icon-image': json.subject_subtype + json.id,
          'icon-size': 0.10
        }
      })
    }
  )
}

const App = () => {
  useEffect(() => {
    const trackingId = '258434087' // Google Analytics tracking ID
    ReactGA.initialize(trackingId)
    ReactGA.event({
      category: 'Map',
      action: 'Loaded'
    })
  }, [])

  return (
    <>
      <div id='map-container'>
        <Map
          style='mapbox://styles/mapbox/satellite-v9'
          containerStyle={{
            height: '98vh',
            width: '95wh'
          }}
        >
          <MapContext.Consumer>
            {(map) => {
              GlobalMap = map
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
            }}
          </MapContext.Consumer>
        </Map>
        {/* earthranger logo */}
        <a href='https://earthranger.com/'>
          <img src='./public/images/LogoEarthRanger.png' id='earth-ranger-logo' />
        </a>
      </div>
    </>
  )
}

export default App
