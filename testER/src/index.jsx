import React from 'react'
import { render } from 'react-dom'
import App from './App'

render(<App configFile='./public/config/config.json' />, document.getElementById('root'))
// render(<App configFile={`${process.env.PUBLIC_URL}/config/config.json`} />, document.getElementById('root'))
