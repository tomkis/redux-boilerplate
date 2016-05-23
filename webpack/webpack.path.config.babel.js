// ==============================================================================
// webpack.path.config
// Path configuration for webpack with theme support.
const path = require('path');

const theme = process.env.THEME_FOLDER || false;
const srcRootPath = path.join(__dirname, '../src/client');

const config = {
  themeName: theme,
  // srcRootPath is the root of all client-related sources and contains
  // the `default` and theme-subfolders where the actual code resides.
  client: srcRootPath,
  // root will be webpack.root and is an array:
  //  0: If theme is given, this is points to the theme folder,
  //     otherwise it points to 'default'.
  //  1: optional: If theme is given, this points to 'default'.
  root: [],
  // ...and for the aliases for 'default' and 'theme':
  default: path.join(srcRootPath, 'default'),
  theme: (theme && path.join(srcRootPath, theme))
      || path.join(srcRootPath, 'default') // fallback to default if no theme given
};

export default config;

// theme first...
if (theme) {
  config.root.push(config.theme);
}

// ... then default
config.root.push(config.default);
