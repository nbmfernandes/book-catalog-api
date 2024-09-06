const { defineConfig } = require("cypress");

const { configurePlugin } = require("cypress-mongodb");

module.exports = defineConfig({
  env: {
    mongodb: {
      uri:'mongodb+srv://dba:papito123@livroapi.2eqks.mongodb.net/?retryWrites=true&w=majority&appName=LivroApi',
      database: 'test',
      collection: 'books'
    }
  },
  
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}'
      configurePlugin(on);
    },
  },
});
