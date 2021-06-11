import { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'

/* renderless wrapper for React-ified mapbox GL popups to ensure content updates stay in sync w/app state */
const Popup = ({ children, coordinates, onClose }) => {
  const popup = useRef(new mapboxgl.Popup({ closeButton: false }))

  useEffect(() => {
    const currentPopupRefValue = popup.current

    currentPopupRefValue.addTo(window.GlobalMap)

    return () => currentPopupRefValue.remove()
  }, [])

  useEffect(() => {
    popup.current.setLngLat(coordinates)
  }, [popup, coordinates])

  useEffect(() => {
    const currentPopupRefValue = popup.current

    currentPopupRefValue.on('close', onClose)

    return () => currentPopupRefValue.off('close', onClose)
  }, [popup, onClose])

  useEffect(() => {
    const container = document.createElement('div')

    ReactDOM.render(children, container)
    popup.current.setDOMContent(container)
  }, [popup, children])

  return null
}

export default Popup
