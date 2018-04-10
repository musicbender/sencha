import webpack from 'webpack';
import client_config from '../webpack.prod.config';
import server_config from '../webpack.server.config';
import Rsync from 'rsync';
import { chalkError, chalkSuccess, chalkWarning, chalkProcessing } from './chalkConfig';

console.log(chalkProcessing('Generating minified bundle. This will take a moment...'));

webpack([
  client_config,
  server_config
], (error, stats) => {
  if (error) {
    console.log(chalkError(error));
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(chalkError(error)));
  }

  if (jsonStats.hasWarnings) {
    console.log(chalkWarning('Webpack generated the following warnings: '));
    jsonStats.warnings.map(warning => console.log(chalkWarning(warning)));
  }

  console.log(`Webpack stats: ${stats}`);
  console.log(chalkSuccess('Your app is compiled in production mode in /dist.'));
  console.log(chalkProcessing('Deploying application...'));

  const rsync = new Rsync()
    .flags('avz')
    .exclude([
      // 'tests/*'
    ])
    .source([
      'dist',
      'tests',
      'index.js',
      'package.json',
      '.nvmrc',
      '.babelrc',
      'tools/start-live.sh'
    ])
    .destination('pjacobs:/var/www/sencha/')
    .set('delete');

  rsync.execute((error, code, cmd) => {
      if (error) {
        console.log(error.message);
      }
      console.log(`Rync a success!`);
      console.log(cmd);
  },
  (data) => {
    console.log(`OUT: ${data}`);
  },
  (data) => {
    console.log(`ERR: ${data}`);
  });

  return 0;
});
