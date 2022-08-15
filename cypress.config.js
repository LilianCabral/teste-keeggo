const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportWidth: 1240,
  viewportHeight: 660,
  projectId: '128076ed-9868-4e98-9cef-98dd7a705d75',

  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
})
