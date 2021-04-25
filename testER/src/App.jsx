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
const keymap = {} // alt, r

/* eslint-disable react/prop-types */
const App = (props) => {
  var [subjects, setSubjects] = useState([])
  var [tracks, setTracks] = useState({})
  var [subjectColor, setSubjectColor] = useState({})
  var [legSub, setLegSub] = useState(undefined)
  var [legSubAvailable, setLegSubAvailable] = useState({})

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

    var nav = new mapboxgl.NavigationControl({ visualizePitch: true })
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
      const url = `https://${config.server}/api/v1.0/subjects`
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
            if (subject.last_position !== undefined) {
              // override subject name if provided in config
              if (config.subjects[subject.id] && config.subjects[subject.id].name) {
                subject.name = config.subjects[subject.id].name;
              }
              drawIcon(subject)
            }
            const oldSubjectColorState = subjectColor
            oldSubjectColorState[subject.id] = subject.color
            setSubjectColor(oldSubjectColorState)
          }) // looping through array of subjects

          // Sets a display_story to be true iff subject has images or description
          //   associated with it (more info to show in legend story)
          for (let i = 0; i < resp.data.data.length; i++) {
            const id = resp.data.data[i].id
            resp.data.data[i].display_story = config.subjects[id] && (config.subjects[id].pictures || config.subjects[id].detail_description)
          }
          setSubjects(resp.data.data)
        })
        .catch(console.error)

      // Cluster attempt
      // GlobalMap.addSource('wildlife', {
      //   type: 'geojson',
      //   data: subjects,
      //   cluster: true,
      //   clusterMaxZoom: 14, // Max zoom to cluster points on
      //   clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
      // });

      // GlobalMap.addLayer({
      //   id: 'clusters',
      //   type: 'circle',
      //   source: 'wildlife',
      //   filter: ['has', 'point_count'],
      //   paint: {
      //   // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
      //   // with three steps to implement three types of circles:
      //   //   * Blue, 20px circles when point count is less than 100
      //   //   * Yellow, 30px circles when point count is between 100 and 750
      //   //   * Pink, 40px circles when point count is greater than or equal to 750
      //   'circle-color': [
      //   'step',
      //   ['get', 'point_count'],
      //   '#51bbd6',
      //   100,
      //   '#f1f075',
      //   750,
      //   '#f28cb1'
      //   ],
      //   'circle-radius': [
      //   'step',
      //   ['get', 'point_count'],
      //   20,
      //   100,
      //   30,
      //   750,
      //   40
      //   ]
      //   }
      //   });

      // GlobalMap.addLayer({
      //   id: 'cluster-count',
      //   type: 'symbol',
      //   source: 'wildlife',
      //   filter: ['has', 'point_count'],
      //   layout: {
      //   'text-field': '{point_count_abbreviated}',
      //   'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      //   'text-size': 12
      //   }
      //   });

      //   GlobalMap.addLayer({
      //   id: 'unclustered-point',
      //   type: 'circle',
      //   source: 'wildlife',
      //   filter: ['!', ['has', 'point_count']],
      //   paint: {
      //   'circle-color': '#11b4da',
      //   'circle-radius': 4,
      //   'circle-stroke-width': 1,
      //   'circle-stroke-color': '#fff'
      //   }
      //   });
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
    const url = `https://${config.server}/api/v1.0/subject/` + subjectId + '/tracks'
    fetch(url)
      .then(resp => {
        if (resp.ok) {
          return resp
        }
        throw Error('Error in request:' + resp.statusText)
      })
      .then(resp => resp.json()) // returns a json object
      .then(resp => {
        drawTrack(resp.data, subjectId)
      })
      .catch(console.error)
  }

  function drawTrack (json, subjectId) {
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
        'line-color': subjectColor[subjectId],
        'line-width': 3
      }
    })
  }

  function drawIcon (json) {
    // GlobalMap.loadImage(json.last_position.properties.image,
    const imgURL = json.common_name !== null ? ('public/images/animal_icons/' + json.common_name + '.png') : json.last_position.properties.image
    GlobalMap.loadImage(imgURL,
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
            'icon-size': json.common_name !== null ? 0.4 : 1.0,
            'icon-anchor': 'bottom'
            // 'icon-padding': 2
          }
        })
        if (config.map.subject_names) {
          GlobalMap.addLayer({
            id: 'name-labels' + json.id,
            type: 'symbol',
            source: 'point' + json.id,
            layout: {
              'text-field': json.name,
              'text-size': 15,
              'text-offset': [0, 0.3],
              'text-anchor': 'top'
            },
            paint: {
              'text-color': 'white'
            }
          })
        }

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
          ReactDOM.render(
            <SubjectPopup
              subject={json} subjectData={config.subjects[json.id]}
              track={tracks} onTrackClick={(updatedTrack) => {
                // const newState = tracks
                const newState = Object.assign({}, tracks)
                newState[updatedTrack[0]] = updatedTrack[1]
                setTracks(newState)
                displayTracks(updatedTrack)
              }}
              onStoryClick={(subject) => setLegSub(subject)}
            />, placeholder)
          new mapboxgl.Popup({ offset: 25 })
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

  function goToLoc (coords) {
    GlobalMap.flyTo({
      center: coords,
      zoom: 15,
      essential: true
    })
  }

  // hot key to reset map (alt + r)
  const logKey = (e) => {
    console.log(e.keyCode)
    if (e.keyCode === 82 || e.keyCode === 18) { // 'r' = 82, alt = 18
      keymap[e.keyCode] = (e.type === 'keydown')
      if (keymap[82] && keymap[18]) {
        resetMap()
      }
    }
  }

  const resetMap = () => {
    GlobalMap.flyTo({
      center: config.map.center === undefined ? [-109.3666652, -27.1166662] : config.map.center, // starting position [lng, lat]
      zoom: config.map.zoom === undefined ? 11 : config.map.zoom, // starting zoom
      essential: true,
      pitch: 0,
      bearing: 0
    })
    // toggle off all tracks??
  }

  return (
    <>
      <div id='map-container' onKeyDown={logKey} onKeyUp={logKey}>
        {/* <a href='https://earthranger.com/'>
          <img src='./public/images/LogoEarthRanger.png' id='earth-ranger-logo' />
        </a> */}
        <Legend
          subs={subjects}
          track={tracks}
          subjectData={config}
          onTrackClick={(updatedTrack) => {
            // const newState = tracks
            const newState = Object.assign({}, tracks)
            newState[updatedTrack[0]] = updatedTrack[1]
            setTracks(newState)
            displayTracks(updatedTrack)
          }}
          onLocClick={(coords) => goToLoc(coords)}
          legSub={legSub}
          onReturnClick={(subject) => setLegSub(subject)}
          onStoryClick={(subject) => setLegSub(subject)}
        />
        {/* <p id='reset' onClick={resetMap}>RESET</p> */}
      </div>
    </>
  )
}

export default App
