/* in ES6/babel we are not able to load modules dynamically :-( */

const assignDeep = require('assign-deep');

const env = process.env.NODE_ENV || 'development';
const config = {
  production: require('./production'),
  development: require('./development')
}[env];

/* merge with local Git untracked file
*/
assignDeep(config, require('./local'));

Object
  .keys(config)
  .forEach(prop => {
    if (process.env[prop] !== undefined) {
      config[prop] = process.env[prop];
    }
  });

export default Object.freeze(config);
