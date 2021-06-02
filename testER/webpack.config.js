// Whilst the configuration object can be modified here, the recommended way of making
// changes is via the presets' options or Neutrino's API in `.neutrinorc.js` instead.
// Neutrino's inspect feature can be used to view/export the generated configuration.
const neutrino = require('neutrino');
const webpack = require('webpack');

const config = neutrino().webpack()

module.exports = {
  ...config,
  plugins: [
    ...config.plugins,
    new webpack.DefinePlugin({
      'process.env': {
        PUBLIC_URL: '"/public"'
      }
    })
  ]
}

// TODO: how to read NODE_ENV