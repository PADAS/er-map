import React from 'react'
import './App.css'
import ReactMapboxGl, { MapContext } from 'react-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoidmpvZWxtIiwiYSI6ImNra2hiZXNpMzA1bTcybnA3OXlycnN2ZjcifQ.gH6Nls61WTMVutUH57jMJQ' // development token
})

const App = () => {
  return (
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
            // add the 3D terrain source
            map.addSource('mapbox-dem', {
              type: 'raster-dem',
              url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
              tileSize: 512,
              maxzoom: 14
            })
            // add a sky layer that will show when the map is highly pitched
            map.addLayer({
              id: 'sky',
              type: 'sky',
              paint: {
                'sky-type': 'atmosphere',
                'sky-atmosphere-sun': [0.0, 0.0],
                'sky-atmosphere-sun-intensity': 15
              }
            })
            map.on('render', function () {
              // add the DEM source as a terrain layer with exaggerated height
              map.setTerrain({ source: 'mapbox-dem', exaggeration: 3 })
            })
          }}
        </MapContext.Consumer>
      </Map>
      {/* earthranger logo */}
      <a href='https://earthranger.com/'>
        <img src='./public/images/LogoEarthRanger.png' id='earth-ranger-logo' />
      </a>
    </div>
  )
}

export default App
