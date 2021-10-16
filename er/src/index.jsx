import React from 'react';
import { render } from 'react-dom';
import App from './App';

// import config from

render(<App configFile='./public/config/config.json' />, document.getElementById('root'));
// render(<App configFile={'./config/config.json'} />, document.getElementById('root'))
