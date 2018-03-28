/**
 * Entry Script
 */

if (process.env.NODE_ENV === 'production') {
  require('./dist/server.bundle.js');
} else {
  require('babel-core/register')({
    presets: ['env']
  });

  require.extensions['.scss'] = () => {
    return;
  };
  require.extensions['.css'] = () => {
    return;
  };
  require('./server/server');
}
