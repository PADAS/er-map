const standard = require('@neutrinojs/standardjs');
const react = require('@neutrinojs/react');

module.exports = {
  options: {
    root: __dirname,
  },
  use: [
    standard(),
    react({
      html: {
        title: 'testER'
      }
    }),
  ],
};
