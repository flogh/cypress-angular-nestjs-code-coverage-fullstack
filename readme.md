Before we begin this tutorial, make sure that you have installed globally @angular/cli, @nestjs, cypress, nyc.
If it's not the case :

```
$ npm i -g  @angular/cli @nestjs cypress nyc
```

0. Init folder root project

```
$ touch cypress-angular-nestjs
```

```
$ cd cypress-angular-nestjs
```

```
$ npm init
```

1. We will then init the front side

```
$ ng new angular
```

```
$ cd angular
```

2. Install now cypress locally as a dev dependency

```
$ (npm install -D cypress)
```

3. We will have to open cypress and select the 'cypress-angular-nestjs' folder

```
$ cypress open
```

By opening the folder, you will generate the cypress.json and cypress folder.  
You can quit 'cypress open' once done.

4. We will then edit the cypress.json like so :

```
{
    "supportFile": "cypress/support/index.js",
    "baseUrl": "http://localhost:4200/",
    "ignoreTestFiles": "**/examples/*.js",
}
```

5. We will create a single test in this project, just to trigger the cypress code coverage.  
   // cypress/integration/basic.spec.ts

```
describe('Basic Test', () => {
    it('Test', () => {
        cy.visit('/');
        cy.url().should('include', '/');
    });
});
```

6. Install ngx-build-plus, ... // TO DO

```
$ npm i -D ngx-build-plus
```

7. Create this file  
   // cypress/coverage.webpack.js

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

8. Update angular/angular.json this way

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

9. Install istanbul-instrumenter-loader  
   // Inside angular/

```
$ npm i -D istanbul-instrumenter-loader
```

10. Install following packages

```
$ npm i -D @istanbuljs/nyc-config-typescript source-map-support ts-node
```

11. Update package json and add

```
"nyc": {
    "extends": "@istanbuljs/nyc-config-typescript",
    "all": true
}
```

12. Install Pckg

```
npm install -D @cypress/code-coverage nyc istanbul-lib-coverage
```

13. Add this at the end of the cypress/support/index.js file

```
import '@cypress/code-coverage/support';
```

14. And update the cypress/plugins/index.js file code like this

```
module.exports = (on, config) => {
    on('task', require('@cypress/code-coverage/task'));
};
```

15. We can try to open cypress, select the previous folder, and launch the basic.spec.ts test  
    At the en of the test should be ..  
    The raw json output is located in .nyc_output folder  
    Open cypress/lcov-report/index.html to see the magic

// Setting up Nestjs

1. At the root folder

```
$ nest new nestjs
```

```
$ cd nestjs
```

2. Add script to package.json

```
"start:coverage": "nyc --silent node server"
```

3. Add a route inside the app.controller

```
@Get('__coverage__')
public getCoverage() {
    if (global['__coverage__']) {
        return { coverage: global['__coverage__'] };
    }
}
```

4. Update angular/cypress.json

```
"env": {
    "codeCoverage": {
        "url": "http://localhost:3000/__coverage__"
    }
}
```
