# redux boilerplate built on top of [redux-elm](https://github.com/salsita/redux-elm)

> Universal, react, react-native, redux-elm, react-router, redux-saga ... want more buzzwords?!

1. [Usage](#usage)
2. [Development](#development)
3. [Configuration](#configuration)
4. [Server source code](#server-source-code)
5. [Client source code](#client-source-code)
  1. [Application architecture](#application-architecture)
  2. [Theme support](#theme-support)
6. [Unit tests](#unit-tests)
7. [List of dependencies](#list-of-dependencies)
  1. [Development Deps](#development-deps)
  2. [Runtime Deps](#runtime-deps)


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
export NODE_ENV=development
export API_BASE=http://localhost:3000
export PORT=3001
npm run start:dev
```
Navigate your browser to http://localhost:3000/

## iOS Development
First start dev server:

```
export NODE_ENV=development
export API_BASE=http://localhost:3000
export PORT=3001
npm run start:dev
```

Then start native dev server:

```
export API_BASE=http://localhost:3000
npm run start:native
```

Then open the project (`ios/boilerplate.xcodeproj`) in XCode and run the app in Simulator (or device)

## Configuration

There is `src/config` which contains production and development settings.
Proper configurations is loaded according to `NODE_ENV` env property.
Additionally `npm install` creates `local.js` config file which can override any
values and it's not tracked in Git repository. Purpose of this config is
for storing sensitive data or developer specific values.

Any top-level variable in config can be also overridden by env variable.

### DevTools & Hot reloading
`redux-boilerplate` supports [`redux-devtools-extension`](https://github.com/zalmoxisus/redux-devtools-extension),
please [install the extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
it's worth it! Boilerplate also supports hot-reloading including Views & Updaters.


## Server source code

The server `src/server/main.js` source code listens for http requests on port 3000,
or port number configured by the environment variable PORT. It serves static files
from the `dist/client` directory under url path `/`. It returns JSON data
for http get request on path `/hello`. For every other url path,
the server returns the default `index.html` page.

## Client source code

### Application architecture

For deeper understanding of application architecture follow thorough [redux-elm documentation](http://salsita.github.io/redux-elm/). Application is
universal, therefore first render is always done on the server and then re-hydrated on the client. By Universal, I mean trully universal therefore
you can reuse your business logic code (Effects & Updaters) in React-Native version as well.

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

## Unit tests

You can run tests by running `npm test` or develop them in watch mode by running `npm run test:watch`.
Unit tests are shared across client and server.

## List of dependencies

This is a brief description what we depend on and why:

### Development Deps

* `babel` and the ecosystem - We need to transpile the code, ES20XX to ES5
* `chai` - Nice asserting library
* `eslint` and ecosystem - We want to keep code quality high and therfore we need a policeman, using airbnb config
* `mocha` - Testing framework
* `request` - We need proxy to implement development runner
* `single-child` - Again utility tool for implementing development runner
* `sinon` - Nice testing tools (Mocking/Spying/Stubbing)
* `webpack` - bundles everything together into minified file

### Runtime Deps

* `express` - lightweight http server
* `history` - `react-router` peer dependency
* `react` and `react-dom` - Thin View library
* `react-native` - Thin View library for native apps
* `react-router` - React routing library
* `redux` - State container
* `redux-react` React binding for Redux
* `react-router-redux` - React Router binding for Redux
* `redux-elm` - The Elm Architecture in JavaScript
* `redux-saga` - Side Effects & Long Running Transactions for Redux
