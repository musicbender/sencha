import express from 'express';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { PORT, DB_HOST, DB_PORT } from './config';
import api from './api';

// webpack
import webpack from 'webpack';
import wpConfig from '../webpack.dev.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// initialization
const app = new express();
const viewDir = process.env.LIVE ? 'dist/views' : 'server/views';

app.set('view engine', 'pug');
app.set('views', viewDir);

// connect to database and start server
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/nc-test-app`);

const db = mongoose.connection;

db.on('error', (err) => {
  console.error(err);
})

db.once('open', () => {
  console.log('mongo connected...');

  app.listen(PORT, err => {
    if (err) { console.error(err); }
    console.log(`NC Test App now live at ${PORT}!`);
  });
})

// Run Webpack dev server in development mode
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(wpConfig);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: wpConfig.output.publicPath,
    stats: {colors: true}
  }));
  app.use(webpackHotMiddleware(compiler, {
    log: console.log
  }));
}

// Middlewares
app.use(express.static(path.join(__dirname, 'public/')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', api);

// send html
app.get('*', (req, res) => {
  res
    .set('Content-Type', 'text/html')
    .status(200)
    .render('index');
});
