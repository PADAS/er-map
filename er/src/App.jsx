import React, { createContext, useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import mapboxgl from 'mapbox-gl';
import SubjectPopupContent from './components/SubjectPopupContent';
import Popup from './components/Popup';
import Legend from './components/Legend';
import HelpButton from './components/HelpButton';

import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import med from '../public/images/med.png';

// instantiate the Map
mapboxgl.accessToken = 'pk.eyJ1IjoidmpvZWxtIiwiYSI6ImNra2hiZXNpMzA1bTcybnA3OXlycnN2ZjcifQ.gH6Nls61WTMVutUH57jMJQ'; // development token

let config;
const keymap = {}; // alt, r
const aquatic = ['#003744', '#005B70', '#219DB8', '#05C1EA', '#60E1FF',
  '#2E8E96', '#47C6B1', '#91E8DA'];
const earthtones = ['#511913', '#711E17', '#961F1A', '#DB2222', '#E5632E',
  '#E67931', '#E69E39', '#D2B541', '#BFBD48'];

const MAP_ICON_SIZE = 30;
const MAP_ICON_SCALE = 2;

window.GlobalMap = null;

export const imgElFromSrc = (src, width = MAP_ICON_SIZE, height = null) => new Promise((resolve, reject) => {
  const img = new Image();
  img.setAttribute('crossorigin', 'anonymous');

  img.addEventListener('load', () => {
    if (width && height) {
      img.width = width;
      img.height = height;
    } else {
      const baseUnit = width || height;
      const { naturalHeight, naturalWidth } = img;
      const largest = Math.max(naturalHeight, naturalWidth) || baseUnit;
      const smallest = Math.min(naturalHeight, naturalWidth) || baseUnit;
      const widthIsLarger = largest === naturalWidth;
      const aspectRatio = smallest / largest;
      if (widthIsLarger) {
        img.width = baseUnit;
        img.height = baseUnit * aspectRatio;
      } else {
        img.height = baseUnit;
        img.width = baseUnit * aspectRatio;
      }
    }
    resolve(img);
  }, { once: true });

  img.onerror = (e) => {
    console.log('image error', src, e);
    reject(new Error('could not load image'));
  };
  img.src = src;
});

export const TrackContext = createContext({});

/* eslint-disable react/prop-types */
const App = (props) => {
  var [subjects, setSubjects] = useState([]);
  var [tracks, setTracks] = useState({});
  var [subjectColor, setSubjectColor] = useState({});
  var [legSub, setLegSub] = useState(undefined);
  const [subjectPopups, setSubjectPopups] = useState([]);
  const [legendOpen, setLegendOpen] = useState(false);

  const toggleLegendState = () => {
    setLegendOpen(!legendOpen);
  };

  function initMap () {
    // set up google analytics
    const trackingId = 'UA-128569083-10'; // Google Analytics tracking ID
    ReactGA.initialize(trackingId);
    ReactGA.pageview(window.location.pathname + window.location.search);

    window.GlobalMap = new mapboxgl.Map({
      container: 'map-container', // container ID
      style: 'mapbox://styles/vjoelm/cktdex96919t117p3rkq7c7yu/draft',
      center: !config.map || !config.map.center ? [-109.3666652, -27.1166662] : config.map.center, // starting position [lng, lat]
      zoom: !config.map || !config.map.zoom ? 11 : config.map.zoom, // starting zoom,
      pitch: !config.map || !config.map.pitch ? 75 : config.map.pitch
    });

    var nav = new mapboxgl.NavigationControl({ visualizePitch: true });
    window.GlobalMap.addControl(nav, 'top-left');

    window.GlobalMap.on('load', function () {
      console.log(process.env.PUBLIC_URL);
      window.GlobalMap.loadImage(med, (_error, img) => {
        window.GlobalMap.addImage('subject-popup-box', img, { sdf: true });
      });

      // fetch call for subjects
      const url = `https://${config.server}/${config.public_name}/api/v1.0/subjects`;
      fetch(url)
        .then(resp => {
          if (resp.ok) {
            return resp;
          }
          throw Error('Error in request:' + resp.statusText);
        })
        .then(resp => resp.json()) // returns a json object
        .then(resp => {
          let index = 0;
          resp.data.data.map((subject) => {
            if (subject.last_position !== undefined) {
              // override subject name if provided in config
              if (config.subjects && config.subjects[subject.id] && config.subjects[subject.id].name) {
                subject.name = config.subjects[subject.id].name;
              }
              drawIcon(subject).then();
            }

            let colors = earthtones;
            if (config.color_scheme) {
              if (config.color_scheme === 'earthtones') {
                colors = earthtones;
              } else if (config.color_scheme === 'aquatic') {
                colors = aquatic;
              } else {
                colors = config.color_scheme;
              }
            }
            subject.color = colors[index % colors.length];
            index++;

            const oldSubjectColorState = subjectColor;
            oldSubjectColorState[subject.id] = subject.color;
            setSubjectColor(oldSubjectColorState);
          }); // looping through array of subjects

          // Sets a display_story to be true iff subject has images or description
          //   associated with it (more info to show in legend story)
          for (let i = 0; i < resp.data.data.length; i++) {
            const id = resp.data.data[i].id;
            resp.data.data[i].display_story = config.subjects && config.subjects[id] && (config.subjects[id].pictures || config.subjects[id].detail_description);
          }
          setSubjects(resp.data.data);
        })
        .catch(console.error);
    });
  }

  useEffect(() => {
    let isSubscribed = true;
    // load configuration data
    fetch(props.configFile, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if (isSubscribed) {
          config = json;
          initMap();
        }
      });
    // Cancel the subscription to useEffect().
    return function cleanup () {
      isSubscribed = false;
    };
  }, []); /* eslint-disable-line react-hooks/exhaustive-deps */

  function displayTracks (updatedTrack) {
    const id = updatedTrack[0];
    const displayed = updatedTrack[1];

    const layer = window.GlobalMap.getLayer('LineString ' + id);

    if (displayed) {
      if (layer === undefined) {
        fetchTrack(id);
      } else {
        window.GlobalMap.setLayoutProperty('LineString ' + id, 'visibility', 'visible'); // turn on visibility
      }
    } else {
      window.GlobalMap.setLayoutProperty('LineString ' + id, 'visibility', 'none'); // turn off visibility
    }
  }

  // Draw tracks and add button component to display tracks
  function fetchTrack (subjectId) {
    const url = `https://${config.server}/${config.public_name}/api/v1.0/subject/` + subjectId + '/tracks';
    fetch(url)
      .then(resp => {
        if (resp.ok) {
          return resp;
        }
        throw Error('Error in request:' + resp.statusText);
      })
      .then(resp => resp.json()) // returns a json object
      .then(resp => {
        drawTrack(resp.data, subjectId);
      })
      .catch(console.error);
  }

  function drawTrack (json, subjectId) {
    window.GlobalMap.addSource(json.features[0].geometry.type + ' ' + json.features[0].properties.id, {
      type: 'geojson',
      data: json
    });

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
        'line-width': 4
      }
    });
  }

  async function fileExists (file) {
    try {
      var img = await fetch(file);
      if (img.status === 404) {
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  async function drawIcon (json) {
    let imgURL = null;
    if (config.subjects && config.subjects[json.id] && config.subjects[json.id].icon) {
      imgURL = config.subjects[json.id].icon;
    } else if (json.common_name !== null && await fileExists(`public/images/animal_icons/${json.common_name}.png`)) {
      imgURL = `public/images/animal_icons/${json.common_name}.png`;
    } else {
      imgURL = json.last_position.properties.image;
    }
    addImage(json, imgURL);
  }

  function addImage (json, imgURL) {
    const width = !config.map || !config.map.map_icon_size ? MAP_ICON_SIZE : config.map.map_icon_size; const height = undefined;
    imgElFromSrc(
      imgURL,
      width * MAP_ICON_SCALE,
      (height ? (height * MAP_ICON_SCALE) : undefined)
    )
      .then((image) => {
        window.GlobalMap.addImage(json.subject_subtype + json.id, image);
        window.GlobalMap.addSource('point' + json.id, {
          type: 'geojson',
          data: json.last_position
        });

        // Animal Icon
        const iconSize = 0.5;
        const iconSizeLayout = ['interpolate', ['linear'], ['zoom'], 1, (iconSize / MAP_ICON_SCALE), 10, (iconSize / MAP_ICON_SCALE), 16, iconSize];
        window.GlobalMap.addLayer({
          id: 'points' + json.id,
          type: 'symbol',
          source: 'point' + json.id,
          layout: {
            'icon-image': json.subject_subtype + json.id,
            'icon-size': iconSizeLayout,
            'icon-anchor': 'bottom',
            'icon-allow-overlap': true
          }
        });

        // Subject Nametag Icon
        const iconSizeSubjectNametagText = ['step', ['zoom'], 12, 10, 16];
        window.GlobalMap.addLayer({
          id: 'box' + json.id,
          type: 'symbol',
          source: 'point' + json.id,
          layout: {
            'text-anchor': 'top',
            'text-offset': [0, 0.5],
            'text-allow-overlap': true,
            'text-field': json.name,
            'text-size': iconSizeSubjectNametagText,
            visibility: (!config.map || config.map.show_subject_names) ? 'visible' : 'none'
          },
          paint: {
            'text-color': 'white',
            'text-halo-color': 'rgba(0, 0, 0, 0.5)',
            'text-halo-blur': 3,
            'text-halo-width': 1
          }
        });

        // bind popup to subject
        window.GlobalMap.on('click', 'points' + json.id, (e) => {
          var coordinates = e.features[0].geometry.coordinates.slice();

          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          setSubjectPopups(
            [...subjectPopups, {
              geometry: e.features[0].geometry,
              properties: json
            }]
          );
        });

        window.GlobalMap.on('mouseenter', 'points' + json.id, () => {
          window.GlobalMap.getCanvas().style.cursor = 'pointer';
        });
        window.GlobalMap.on('mouseleave', 'points' + json.id, () => {
          window.GlobalMap.getCanvas().style.cursor = '';
        });
      })
      .catch((error) => {
        console.warn('imgElFromSrc error', error);
      });
  }

  function goToLoc (coords) {
    window.GlobalMap.flyTo({
      center: coords,
      zoom: 15,
      essential: true
    });
  }

  // hot key to reset map (alt + r)
  const logKey = (e) => {
    if (e.keyCode === 82 || e.keyCode === 18) { // 'r' = 82, alt = 18
      keymap[e.keyCode] = (e.type === 'keydown');
      if (keymap[82] && keymap[18]) {
        resetMap();
      }
    }
  };

  const resetMap = () => {
    window.GlobalMap.flyTo({
      center: !config.map || !config.map.center ? [-109.3666652, -27.1166662] : config.map.center, // starting position [lng, lat]
      zoom: !config.map || !config.map.zoom ? 11 : config.map.zoom, // starting zoom,
      pitch: !config.map || !config.map.pitch ? 75 : config.map.pitch,
      essential: true,
      bearing: 0
    });
    // toggle off all tracks??
  };

  return (
    <>
      <TrackContext.Provider value={{ displayTracks, setTracks, tracks }}>
        <div id='map-container' onKeyDown={logKey} onKeyUp={logKey}>
          <HelpButton />

          <Legend
            title={config !== undefined ? config.map_title : null}
            subs={subjects}
            subjectData={config}
            onLocClick={(coords) => goToLoc(coords)}
            legendOpen={legendOpen}
            onLegendStateToggle={toggleLegendState}
            legSub={legSub}
            onReturnClick={(subject) => setLegSub(subject)}
            onStoryClick={(subject) => setLegSub(subject)}
            tracks={tracks}
          />
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
              );
            }}
            coordinates={geometry.coordinates.slice()}
          >
            <TrackContext.Provider value={{ displayTracks, setTracks, tracks }}>
              <SubjectPopupContent
                subject={properties} subjectData={config.subjects[properties.id]}
                onStoryClick={(subject) => setLegSub(subject)} legendOpen={legendOpen}
                onLegendStateToggle={toggleLegendState} {...props}
              />
            </TrackContext.Provider>
          </Popup>
        )}
      </TrackContext.Provider> {/* eslint-disable-line react/jsx-closing-tag-location */}
    </>
  );
};

export default App;
