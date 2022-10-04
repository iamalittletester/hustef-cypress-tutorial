const { defineConfig } = require("cypress");

module.exports = defineConfig({
  pageLoadTimeout : 120000,
  chromeWebSecurity : false,
  
  e2e: {
    experimentalSessionAndOrigin : true,
    env: {
      'theSecondCookieValue': 'secondValue',
    },
    // baseUrl : 'https://example.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
