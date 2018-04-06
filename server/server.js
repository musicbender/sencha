import express from 'express';
import http from 'http';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import socketIO from 'socket.io';
import { PORT, DB_HOST, DB_PORT } from './config';
import api from './api';

// webpack
import webpack from 'webpack';
import wpConfig from '../webpack.dev.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// initialization
const app = new express();
const server = http.createServer(app);
const io = socketIO(server);
const viewDir = process.env.LIVE ? 'dist/views' : 'server/views';

app.set('view engine', 'pug');
app.set('views', viewDir);

// connect to database and start server
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/nc-test-app`);

const db = mongoose.connection;

db.on('error', err => {
  console.error(err);
});

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

// sockets
io.on('connection', socket => {
  console.log('User connected')

  socket.on('inProgress', () => {
    io.emit('inProgress', {
      message: 'in progress'
    });
  });

  socket.on('notInProgress', () => {
    io.emit('notInProgress', {
      message: 'not in progress'
    });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected')
  });
})

server.listen(PORT, () => console.log(`Listening on port ${PORT}`))
