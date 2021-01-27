import { hot } from 'react-hot-loader'
import React from 'react'
import './App.css'
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1Ijoic2hhaG01IiwiYSI6ImNrOXJzNTdndTBkODEzbW10bmdrcWJqc2EifQ.x3zzrFN1gck-G0Jn3Iw2dA'
})

const App = () => (
  <Map
    style='mapbox://styles/mapbox/streets-v9'
    containerStyle={{
      height: '100vh',
      width: '100vw'
    }}
  >
    <Layer type='symbol' id='marker' layout={{ 'icon-image': 'marker-15' }}>
      <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
    </Layer>
  </Map>
)

export default hot(module)(App)
