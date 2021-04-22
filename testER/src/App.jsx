import React, { createContext, useCallback, useEffect, useState } from 'react'
import ReactGA from 'react-ga'
import mapboxgl from 'mapbox-gl'
import ReactDOM from 'react-dom'
import SubjectPopupContent from './components/SubjectPopupContent'
import Popup from './components/Popup'
import Legend from './components/Legend'

import './App.css'
import 'mapbox-gl/dist/mapbox-gl.css'

// instantiate the Map
mapboxgl.accessToken = 'pk.eyJ1IjoidmpvZWxtIiwiYSI6ImNra2hiZXNpMzA1bTcybnA3OXlycnN2ZjcifQ.gH6Nls61WTMVutUH57jMJQ' // development token

let config
const keymap = {} // alt, r


window.GlobalMap = null


export const TrackContext = createContext({})

/* eslint-disable react/prop-types */
const App = (props) => {
  var [subjects, setSubjects] = useState([])
  var [tracks, setTracks] = useState({})
  var [subjectColor, setSubjectColor] = useState({})
  var [legSub, setLegSub] = useState(undefined)
  var [legSubAvailable, setLegSubAvailable] = useState({})
  const [subjectPopups, setSubjectPopups] = useState([]);

  // TODO: detailed handling of missing config info
  function initMap () {
    // set up google analytics
    const trackingId = 'UA-128569083-10' // Google Analytics tracking ID
    ReactGA.initialize(trackingId)
    ReactGA.pageview(window.location.pathname + window.location.search)

    window.GlobalMap = new mapboxgl.Map({
      container: 'map-container', // container ID
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: config.map.center === undefined ? [-109.3666652, -27.1166662] : config.map.center, // starting position [lng, lat]
      zoom: config.map.zoom === undefined ? 11 : config.map.zoom // starting zoom
    })

    var nav = new mapboxgl.NavigationControl({ visualizePitch: true })
    window.GlobalMap.addControl(nav, 'top-left')

    window.GlobalMap.on('load', function () {
      // add the 3D terrain source
      window.GlobalMap.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 14
      })

      // add a sky layer that will show when the map is highly pitched
      window.GlobalMap.addLayer({
        id: 'sky',
        type: 'sky',
        paint: {
          'sky-type': 'atmosphere',
          'sky-atmosphere-sun': [0.0, 0.0],
          'sky-atmosphere-sun-intensity': 15
        }
      })

      // add 3D terrain
      window.GlobalMap.on('render', function () {
        // add the DEM source as a terrain layer with exaggerated height
        window.GlobalMap.setTerrain({ source: 'mapbox-dem', exaggeration: 3 })
      })

      // fetch call for subjects
      const url = 'https://ermap-server-sandbox.pamdas.org/api/v1.0/subjects'
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
            if (config.subjects[id] != undefined &&
              (config.subjects[id].pictures != undefined ||
                config.subjects[id].detail_description != undefined)) {
              resp.data.data[i].display_story = true
            } else {
              resp.data.data[i].display_story = false
            }
          }

          setSubjects(resp.data.data)
        })
        .catch(console.error)

      // Cluster attempt
      // window.GlobalMap.addSource('wildlife', {
      //   type: 'geojson',
      //   data: subjects,
      //   cluster: true,
      //   clusterMaxZoom: 14, // Max zoom to cluster points on
      //   clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
      // });

      // window.GlobalMap.addLayer({
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

      // window.GlobalMap.addLayer({
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

      //   window.GlobalMap.addLayer({
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

    const layer = window.GlobalMap.getLayer('LineString ' + id)

    if (displayed) {
      if (layer === undefined) {
        fetchTrack(id)
      } else {
        window.GlobalMap.setLayoutProperty('LineString ' + id, 'visibility', 'visible') // turn on visibility
      }
    } else {
      window.GlobalMap.setLayoutProperty('LineString ' + id, 'visibility', 'none') // turn off visibility
    }
  }


  // Draw tracks and add button component to display tracks
  function fetchTrack (subjectId) {
    const url = 'https://ermap-server-sandbox.pamdas.org/api/v1.0/subject/' + subjectId + '/tracks'
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
    window.GlobalMap.addSource(json.features[0].geometry.type + ' ' + json.features[0].properties.id, {
      type: 'geojson',
      data: json
    })

    window.GlobalMap.addLayer({
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
    // window.GlobalMap.loadImage(json.last_position.properties.image,
    const imgURL = json.common_name !== null ? ('public/images/animal_icons/' + json.common_name + '.png') : json.last_position.properties.image
    window.GlobalMap.loadImage(imgURL,
      function (error, image) {
        if (error) throw error
        window.GlobalMap.addImage(json.subject_subtype + json.id, image)
        window.GlobalMap.addSource('point' + json.id, {
          type: 'geojson',
          data: json.last_position
        })
        window.GlobalMap.addLayer({
          id: 'points' + json.id,
          type: 'symbol',
          source: 'point' + json.id,
          layout: {
            'icon-image': json.subject_subtype + json.id,
            'icon-size': json.common_name !== null ? 0.4 : 1.0,
            'icon-anchor': 'bottom' // TODO: test if this worked (no floating over water)
          }
        })
        window.GlobalMap.addLayer({
          id: 'name-labels' + json.id,
          type: 'symbol',
          source: 'point' + json.id,
          layout: {
            'text-field': json.last_position.properties.title,
            'text-size': 15,
            'text-offset': [0, 0.3],
            'text-anchor': 'top'
          },
          paint: {
            'text-color': 'white'
          }
        })

        // bind popup to subject
        window.GlobalMap.on('click', 'points' + json.id, (e) => {
          var coordinates = e.features[0].geometry.coordinates.slice()

          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
          }

          setSubjectPopups(
            [...subjectPopups, {
              geometry: e.features[0].geometry,
              properties: json,
            }]
          )
        })

        // popup on hover
        var popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false
        })

        /* const placeholder = document.createElement('div')
        const name = document.createElement('p')
        name.textContent = json.name
        placeholder.appendChild(name);
        placeholder.classList.add('name')
        ReactDOM.render(<p className='name'>{json.name}</p>, placeholder)
        new mapboxgl.Popup({closeButton: false, offset: {bottom: [0, 50]}, className:'namePopup', closeOnClick: false})
          .setDOMContent(placeholder)
          .setLngLat(json.last_position.geometry.coordinates)
          .addTo(window.GlobalMap) */

        // change mouse when hovering over a subject
        // window.GlobalMap.on('mouseenter', 'points' + json.id, () => {
        //   window.GlobalMap.getCanvas().style.cursor = 'pointer'
        // })
        // window.GlobalMap.on('mouseleave', 'points' + json.id, () => {
        //   window.GlobalMap.getCanvas().style.cursor = ''
        // })
      }
    )
  }

  function goToLoc (coords) {
    window.GlobalMap.flyTo({
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
    window.GlobalMap.flyTo({
      center: config.map.center === undefined ? [-109.3666652, -27.1166662] : config.map.center, // starting position [lng, lat]
      zoom: config.map.zoom === undefined ? 11 : config.map.zoom, // starting zoom
      essential: true,
      pitch: 0,
      bearing: 0
    })
    // toggle off all tracks??
  }

  return <TrackContext.Provider value={{ displayTracks, setTracks, tracks }}>
      <div id='map-container' onKeyDown={logKey} onKeyUp={logKey}>
        {/* <a href='https://earthranger.com/'>
          <img src='./public/images/LogoEarthRanger.png' id='earth-ranger-logo' />
        </a> */}
        <Legend
          subs={subjects}
          subjectData={config}
          onLocClick={(coords) => goToLoc(coords)}
          legSub={legSub}
          onReturnClick={(subject) => setLegSub(subject)}
          onStoryClick={(subject) => setLegSub(subject)}
        />
        {/* <p id='reset' onClick={resetMap}>RESET</p> */}
      </div>
      {subjectPopups.map(({ properties, geometry }) => 
        <Popup
          key={`${properties.id}-popup`}
          onClose={() => {
            setSubjectPopups(
              subjectPopups
                .filter(({ properties: { id } }) =>
                  id !== properties.id
              )
            )
          }}
          coordinates={geometry.coordinates.slice()} >
            <TrackContext.Provider value={{ displayTracks, setTracks, tracks }}>
              <SubjectPopupContent subject={properties} subjectData={config.subjects[properties.id]} onStoryClick={(subject) => setLegSub(subject)} {...props}  />
            </TrackContext.Provider>
          </Popup>
      )}
    </TrackContext.Provider>
}

export default App
