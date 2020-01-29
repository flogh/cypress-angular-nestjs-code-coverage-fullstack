# Cypress Angular Nestjs Code Coverage Fullstack

This repo is inspired by :  
https://docs.cypress.io/guides/tooling/code-coverage.html#Examples  
https://github.com/cypress-io/cypress-example-realworld  
https://github.com/skylock/cypress-angular-coverage-example

Before we begin, make sure that you have installed globally @angular/cli, @nestjs/cli, cypress, nyc.
If it's not the case :

```
$ npm i -g  @angular/cli @nestjs/cli cypress nyc
```

## Cypress Part

1. Init folder root project

```
$ touch cypress-angular-nestjs
```

```
$ cd cypress-angular-nestjs
```

```
$ npm init
```

2. Install cypress `locally` as a dev dependency

```
$ npm install -D cypress
```

3. We will have to open cypress and select the 'cypress-angular-nestjs' folder

```
$ cypress open
```

> By opening the folder, you will generate the cypress.json and cypress folder.  
> You can quit 'cypress open' once done.

4. We will then edit the cypress.json like so :

> // cypress.json

```
{
    "supportFile": "cypress/support/index.js",
    "baseUrl": "http://localhost:4200/",
    "ignoreTestFiles": "**/examples/*.js",
}
```

5. We will create a single test in this project, just to trigger the cypress code coverage.

> // cypress/integration/basic.spec.ts

```
describe('Basic Test', () => {
    it('Test', () => {
        cy.visit('/');
        cy.url().should('include', '/');
    });
});
```

6. Create this file

> // cypress/coverage.webpack.js

```
module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|ts)$/,
                loader: 'istanbul-instrumenter-loader',
                options: { esModules: true },
                enforce: 'post',
                // include: require('path').join(__dirname, '..', 'angular'),
                exclude: [/\.(e2e|spec)\.ts$/, /node_modules/, /(ngfactory|ngstyle)\.js/],
            },
        ],
    },
};
```

7. Add this at the end of the cypress/support/index.js file

> // cypress/support/index.js

```
import '@cypress/code-coverage/support';
```

8. And update the cypress/plugins/index.js file code like this

> // cypress/plugins/index.js

```
module.exports = (on, config) => {
    on('task', require('@cypress/code-coverage/task'));
};
```

## Angular Part

1. We will then init the front part

```
$ ng new angular
```

```
$ cd angular
```

2. Install ngx-build-plus to extends the Angular CLI's build process and instrument the code

```
$ npm i -D ngx-build-plus
```

3. Update angular.json to use ngx-build with extra config

> // angular/angular.json

```
"serve": {
    "builder": "ngx-build-plus:dev-server", /* UPDATE THIS LINE */
    "options": {
        "browserTarget": "angular:build",
        "extraWebpackConfig": "../cypress/coverage.webpack.js" /* ADD THIS LONE */
    },
    "configurations": {
        "production": {
            "browserTarget": "angular:build:production"
        }
    }
},
```

4. Instrument JS files with istanbul-lib-instrument for subsequent code coverage reporting

```
$ npm i -D istanbul-instrumenter-loader
```

5. Make Istanbul understand your Typescript source files

```
$ npm i -D @istanbuljs/nyc-config-typescript source-map-support ts-node
```

6. Make sure that Istanbul takes advantage of it by adding this configuration in your package.json

> // angular/package.json

```
"nyc": {
    "extends": "@istanbuljs/nyc-config-typescript",
    "all": true
}
```

7. Add cypress code coverage plugin

```
npm install -D @cypress/code-coverage nyc istanbul-lib-coverage
```

> We can now start the ng serve, try to open cypress again, select the previous folder, and launch the basic.spec.ts test  
> If everything went good, we should see at the end of the test 'aa' line

> The raw json output is located in .nyc_output folder

> Open cypress/lcov-report/index.html to see the magic

## Nestjs Part

1. At the project root

```
$ nest new nestjs
```

```
$ cd nestjs
```

2. Add script to package.json

> // nestjs/package.json

```
"start:coverage": "nyc --silent node server"
```

3. Add a get route inside the app.controller

> // nestjs/src/app.controller.ts

```
@Get('__coverage__')
public getCoverage() {
    if (global['__coverage__']) {
        return { coverage: global['__coverage__'] };
    }
}
```

4. Update cypress.json and add the backend url like so

> // cypress.json

```
{
    "supportFile": "cypress/support/index.js",
    "baseUrl": "http://localhost:4200/",
    "ignoreTestFiles": "**/examples/*.js",
    "env": {
        "codeCoverage": {
            "url": "http://localhost:3000/__coverage__"
        }
    }
}
```

> You can now restart ng serve, nest start, open cypress and re-run the basic.spec.ts test to regenerate the coverage folder which would now contain both angular and nestjs code coverage

## That's it !
