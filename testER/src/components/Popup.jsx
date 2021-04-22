import React, { Fragment, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'

/* renderless wrapper for React-ified mapbox GL popups to ensure content updates stay in sync w/app state */
const Popup = ({ children, coordinates, onClose }) => {
  const popup = useRef(new mapboxgl.Popup())

  useEffect(() => {
    popup.current.addTo(window.GlobalMap)

    return () => popup.current.remove()
  }, []);

  useEffect(() => {
    popup.current.setLngLat(coordinates)
  }, [popup, coordinates])

  useEffect(() => {
    popup.current.on('close', onClose)

    return () => popup.current.off('close', onClose)
  }, [popup, onClose])

  useEffect(() => {
    const container = document.createElement('div')

    ReactDOM.render(children, container)

    popup.current.setDOMContent(container);

  }, [popup, children])

  return null

}

export default Popup