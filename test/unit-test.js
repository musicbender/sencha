import ncWebTest from 'nc-web-test';

ncWebTest({
  type: 'unit',
  pageTitle: 'Test App',
  globPattern: 'src/**/*.test.js',
  ignored: [
    'tests/*',
    'test/functional/*',
    'test/integration/*',
    'node_modules/**/*'
  ],
  isLocal: true
});
