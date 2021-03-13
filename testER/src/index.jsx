import React from 'react'
import { render } from 'react-dom'
import App from './App'

export const {
    REACT_APP_ER_HOST,
    REACT_APP_MAPBOX_TOKEN,
    REACT_APP_ER_API_URL,
    REACT_APP_ROUTE_PREFIX,
  } = process.env;

render(<App configFile='./public/config/config.json' />, document.getElementById('root'))
