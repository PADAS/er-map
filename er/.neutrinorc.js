const standard = require('@neutrinojs/standardjs');
const react = require('@neutrinojs/react');
const devServer = require('@neutrinojs/dev-server');

module.exports = {
  options: {
    root: __dirname,
  },
  use: [
    standard({
        eslint: {
          failOnError: false,
          emitWarning: true
        }
      }
    ),
    react({
      html: {
        title: 'testER'
      },
      publicPath: ''
    }),
    devServer({
      port: 3000,
      hot: true,
      // Redirect 404s to index.html, so that apps that use the HTML 5 History API work.
      historyApiFallback: true,
      // Only display compile duration and errors/warnings, to reduce noise when rebuilding.
      stats: {
        all: false,
        errors: true,
        timings: true,
        warnings: true,
      },
    }),
  ],
};