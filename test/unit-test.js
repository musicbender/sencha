import cappuccino from 'ncw-cappuccino';

cappuccino({
  type: 'unit',
  pageTitle: 'Sencha',
  globPattern: 'src/**/*.test.js',
  ignored: [
    'tests/*',
    'test/functional/*',
    'test/integration/*',
    'node_modules/**/*'
  ],
  isLocal: true
});
