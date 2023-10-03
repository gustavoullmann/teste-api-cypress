const { defineConfig } = require("cypress");


module.exports = defineConfig({
  watchForFileChanges: false,
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "mochawesome-report",
    overwrite: false,
    html: false,
    json: true
  },
  e2e: {
    baseUrl: 'http://localhost:3000'
  },

});