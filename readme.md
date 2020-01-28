1-. npm i -g @angular/cli
1. ng new angular
   1+ cd angular
2. npm install cypress --save-dev
3. cypress open => Select angular project
   3+ Quit window (it generates the cypress folder + cypress.json)
4. Edit cypress.json
   {
   "supportFile": "cypress/support/index.js",
   "baseUrl": "http://localhost:4200/",
   "ignoreTestFiles": "\*_/examples/_.js",
   }
5. Add basic.spec.ts under cypress/integration
// CODE COVERAGE INSTALLATION
6. npm i -D ngx-build-plus
7. add cypress/coverage.webpack.js
8. Update angular.json
9. npm i -D istanbul-instrumenter-loader
10. npm i -D @istanbuljs/nyc-config-typescript source-map-support ts-node
11. Update package json
"nyc": {
    "extends": "@istanbuljs/nyc-config-typescript",
    "all": true
},
12. npm install -D @cypress/code-coverage nyc istanbul-lib-coverage
13. // cypress/support/index.js
    import '@cypress/code-coverage/support';
14. // cypress/plugins/index.js
    module.exports = (on, config) => {
      on('task', require('@cypress/code-coverage/task'))
    }

// END ANGULAR CONF

15. cd ..
16 npm run start
// Code coverage should be enabled for the front end
// .nyc_output folder contains the raw json
// Open angular/cypress/lcov-report index.html to see the magic

// Setting up NestJs

1. npm i -g @nestjs/cli
2. nest new nestjs
3. cd nestjs
4-. npm i -g nyc
4. Add to package.json scripts: 
"start:coverage": "nyc --silent node server"
5. Add the getRoute to app.controller
6. Update angular/cypress.json
"env": {
    "codeCoverage": {
      "url": "http://localhost:3000/__coverage__"
    }
}
// END 
