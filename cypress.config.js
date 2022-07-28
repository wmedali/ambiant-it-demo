const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    defaultCommandTimeout: 5000,
    baseUrl: "https://www.saucedemo.com/",
    viewportWidth: 1366,
    viewportHeight: 768,
    watchForFileChanges: false,
    video: false,
    reporter: "cypress-multi-reporters",
    reporterOptions: {
      reporterEnabled: [
        "spec",
        "mocha-junit-reporter",
        "cypress-mochawesome-reporter",
      ],
      mochaJunitReporterReporterOptions: {
        mochaFile: "cypress/reports/junit/results-[hash].xml",
      },
    },
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
  },
});
