# Redux-side-effects driven react boilerplate

This is a very simple example to illustrate the usage of
[redux-side-effects](https://github.com/salsita/redux-side-effects) with
[react](https://www.npmjs.com/package/react).
Together with the pre-configured development tools like
[eslint](http://eslint.org),
[webpack](https://github.com/webpack/webpack),
and testing frameworks like
[karma](http://karma-runner.github.io/0.13/index.html),
[mocha](https://github.com/mochajs/mocha), and various other
[packages](#list-of-dependencies),
it can be used as a basis for coding new React/Redux projects.


1. [Usage](#usage)
2. [Development](#development)
  1. [Using immutable for redux store state](#using-immutable-for-redux-store-state)
  2. [Passing environment variables to client](#passing-environment-variables-to-client)
3. [Server source code](#server-source-code)
4. [Client source code](#client-source-code)
  1. [Application URL router](#application-url-router)
  2. [Side-effects](#side-effects)
  3. [URL history](#url-history)
  4. [Theme support](#theme-support)
5. [Quest list](#quest-list)
  1. [Hot reloading](#hot-reloading)
  2. [Clean up webpack configuration](#clean-up-webpack-configuration)
  3. [Better side-effects example](#better-side-effects-example)
6. [Server tests](#server-tests)
7. [package.json](#package-json)
  1. [List of dependencies](#list-of-dependencies)


## Usage
```
git clone git@github.com:salsita/redux-boilerplate.git
cd redux-boilerplate
npm install
npm start
```
Navigate your browser to http://localhost:3000/


## Development
```
npm run start:dev
```
Navigate your browser to http://localhost:3001/

## Configuration

There is `src/config` which contains production and development settings.
Proper configurations is loaded according to `NODE_ENV` env property.
Additionally `npm install` creates `local.js` config file which can override any
values and it's not tracked in Git repository. Purpose of this config is
for storing sensitive data or developer specific values.

Any top-level variable in config can be also overridden by env variable.

## Quest list

 * In `npm run build-artifacts`, the including of the node\_modules directory
should not be necessary because webpack tracks dependencies via require() statements
and it is therefore suppossed to deliver them.

### Hot reloading
Hot reloading is not working properly (or at all). It may have to do with the use of devRunner.js,
and maybe that the client does not connect back to the webpack-dev-server to listen for
refresh events due to not being passed the port number.

Also
[react-hot-loader](https://github.com/gaearon/react-hot-loader) is going to be phased out so
[react-transform-hmr](https://github.com/gaearon/react-transform-hmr) should be used instead.
For instance the book
[SurviveJS - Webpack and React](https://leanpub.com/survivejs_webpack_react)
presents a working example.


## Server source code

The server `src/server/main.js` source code listens for http requests on port 3000,
or port number configured by the environment variable PORT. It serves static files
from the `dist/client` directory under url path `/`. It returns JSON data
for http get request on path `/hello`. For every other url path,
the server returns the default `index.html` page.

## Client source code

### Application URL router

The client router `src/client/default/router.jsx` shows which React component implements which url path.
For instance when the user types into a browser a url path that the server does not know
and replies with the default `index.html` file content, the client `NotFound` React component
will render the 404 Page Not Found in the browser.

### Side-effects

This a simple example of a side effect is in  `src/client/default/reducers/fooReducer.js`.

### URL history

Sometimes it is needed to be able to navigate to different url path
from a current one. Regardless of how the url path is constructed,
the `push` function of the `react-router-redux`  can be used
to instruct the browser to change to the given url path.
The application router then gets to select the component
to render the page based on the new url path.
No request to the server is made.

See example in `src/client/default/components/Application.jsx`:

### Theme support

The boilerplate offers theme support by utilizing webpack's mechanism for resolving modules.

#### Example

? Your code is in `src/client/default`. Say you want to create a theme called "green".

! Create a new folder `src/client/green`.
! Export an environment variable `export THEME_FOLDER=green`. This will enable the green theme.

? Now you want to replace your less-variables for the green theme. You have them in `src/client/default/less/variables.less`.

! Copy the file to `src/client/green/less/variables.less`, and adjust them.

? The "green" theme should show a different text in the `Foo`-component.

! Do the same - copy the file `src/client/default/components/foo.jsx` to the green theme and adjust.

**Important:** You have to allow webpack resolve the module locations for you. This means, don't use relative (or absolute)
paths. Webpack will resolve them starting with the config's `root` path(s) - and that's how theming works.

Note: After adding new files, you have to restart your (dev)server to introduce them to webpack.

## Favicon

Favicon did not always function properly. The trick that made the favicon to be picked up by the browser
was to add the graphics in png format `src/client/default/static-resources/favicon.png`
and to modify the `src/client/default/static-resources/index.html` to let the browser
to choose from multiple formats. Like this:
```
<head>
  <link rel="icon" href="favicon.ico" type="image/x-icon" />
  <link rel="icon" href="favicon.png" type="image/png" /> ...
</head>
```

## Server tests

There are two commands to run the same set of backend tests: `npm run test_backend`
and `npm run test_backend_cci`. The reason is that mocha only allows for one
test reporter. The test reporter `nyan` produces test reports readable by the user.
The test reporter `mocha-junit-reporter` produces test reports for
[CircleCI](https://circleci.com/) (Circle Continuous Integration, hence the `_cci` suffix).
The test reports are written to file `test-results.xml`.


## package.json

If `npm install` command is to succeed on Windows (without cygwin), then the command must not
use any syntax or programs specific to the Unix environment.

The `npm run build-artifacts` command produces production tarball for CircleCI which deploys it.
Therefore it has to be named artifacts, not artefacts
([interesting note](http://grammarist.com/spelling/artefact-artifact/)).

Be prepared to do some configuration tinkering when placing shared source code outside
the package.json directory, in order to make the eslint and babel to correctly work
with these files.


### List of dependencies

This is the list of dependencies taken from the package.json file with some short descriptions.

Development dependencies | Synopsis
------------------------ | --------
[babel, babel-core](https://babeljs.io)   | Latest (ES2015 and beyond) JavaScript transpiler/compiler.
[babel-eslint](https://github.com/babel/babel-eslint)       | Allows to lint all valid Babel code with ESLlint.
[babel-loader](https://github.com/babel/babel-loader)       | Allows transpiling JavaScript files using Babel and webpack.
[css-loader](https://github.com/webpack/css-loader#readme)  | CSS loader for webpack.
[eslint](http://eslint.org)   | Pluggable linting utility for JavaScript and JSX.
[eslint-loader](https://github.com/MoOx/eslint-loader#readme)   | ESLint loader for webpack
[eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import)   | ESLint plugin with support for linting of ES2015+ (ES6+) import/export syntax.
[eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)     | React specific linting rules for ESLint.
[file-loader](https://github.com/webpack/file-loader)   | var url = require("file!./file.png"); // => emits file.png as file in the output directory and returns the public url
[font-awesome](http://fontawesome.io)   | Scalable vector icons that can instantly be customized with CSS.
[font-awesome-webpack](https://github.com/gowravshekar/font-awesome-webpack)  | Font awesome configuration and loading package for webpack, using font-awesome (Less).
[karma](http://karma-runner.github.io/0.13/index.html)  | Testing environment to make test-driven development easy.
[karma-chai](http://xdissent.github.io/karma-chai/)     | Make the Chai assertion library available in Karma.
karma-chrome-launcher    | x
karma-cli                | x
karma-junit-reporter     | x
karma-mocha              | x
[karma-nyan-reporter](https://github.com/dgarlitt/karma-nyan-reporter#readme)   | Nyan Cat style test results reporter.
karma-phantomjs-launcher | x
karma-webpack            | x
[mocha](https://github.com/mochajs/mocha)   | JavaScript test framework for Node.js and the browser.
[mocha-junit-reporter](https://github.com/michaelleeallen/mocha-junit-reporter#readme)  | Produces JUnit-style XML test results.
[phantomjs-prebuilt](https://github.com/Medium/phantomjs)  | Scripted, headless browser used for automating web page interaction.
[phantomjs-polyfill](https://github.com/conversocial/phantomjs-polyfill)  | This is a polyfill for function.prototype.bind which is missing from PhantomJS.
[raw-loader](https://github.com/webpack/raw-loader)                       | var fileContent = require("raw!./file.txt"); // => returns file.txt content as string
[react-hot-loader](https://github.com/gaearon/react-hot-loader)           | Re-render the source code changes automatically in the browser.
[redux-devtools](https://github.com/gaearon/redux-devtools#readme)        | A live-editing time travel environment for Redux.
[request](https://github.com/request/request#readme)                      | Simple way to make http calls with https and redirect support.
[single-child](https://github.com/twolfson/single-child)                  | Spawn a single child process which kills itself on restart.
[sinon](http://sinonjs.org)                                               | Standalone test spies, stubs and mocks for JavaScript.
[sinon-chai](https://github.com/domenic/sinon-chai#readme)                | Provide sinon for use with the Chai assertion library.
[source-map-support](https://github.com/evanw/node-source-map-support#readme) | Source map support for stack traces in node via the V8 stack trace API.
[style-loader](https://github.com/webpack/style-loader#readme)            | Style loader for webpack.
[stylus-loader](https://github.com/shama/stylus-loader#readme)
| Stylus loader for webpack
[url-loader](https://github.com/webpack/url-loader#readme)                | Url loader for webpack.
[webpack](https://github.com/webpack/webpack)                             | Module bundler. The main purpose is to bundle JavaScript files for usage in a browser.
[webpack-dev-server](https://github.com/webpack/webpack-dev-server)       | Serves a webpack application. Updates the browser on changes.


Dependencies            | Synopsis
----------------------- | --------
[babel-runtime](https://www.npmjs.com/package/babel-runtime)    | Self-contained babel runtime.
[bluebird](https://github.com/petkaantonov/bluebird)            | JavaScript promise library.
[express](http://expressjs.com)     | Web application framework for Node.js.
[history](https://github.com/rackt/history#readme)          | JavaScript library to manage session history in browsers (and testing environments).
[immutable](https://github.com/facebook/immutable-js)       | Immutable collections for JavaScript. Immutable data cannot be changed once created.
[react](https://www.npmjs.com/package/react)   | JavaScript library for user interfaces.
[react-document-meta](https://github.com/kodyl/react-document-meta#readme)  | HTML meta tags for React-based applications.
[react-dom](https://www.npmjs.com/package/react-dom)    | Entry point of the DOM-related rendering paths (ReactDOM.render()).
[react-redux](https://github.com/gaearon/react-redux)   | React bindings for Redux.
[react-router](https://github.com/rackt/react-router/tree/master/docs)  | Router directs URLs in a single page application to specific handlers.
[redux](http://rackt.org/redux)     | Predictable state container for JavaScript applications.
[redux-router](https://github.com/acdlite/redux-router#readme)              | Library to keep the router state (current pathname, query, and params) inside the Redux store.
[redux-side-effects](https://github.com/salsita/redux-side-effects#readme)  | Redux store implementation with proper interface for asynchronous store operations.
[serve-favicon](https://github.com/expressjs/serve-favicon) | Node.js middleware for serving a favicon.
[serve-static](https://github.com/expressjs/serve-static)   | Node.js middleware to serve static files from withing a given root directory.
