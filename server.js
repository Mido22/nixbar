
/**
 * Setup and run the development server for Hot-Module-Replacement
 * https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
 * @flow
 */

import express from 'express';
import webpack from 'webpack';
import winston from 'winston';
// import HTTP from 'http';
// const server = HTTP.createServer(app);
import Socket from 'socket.io';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from './webpack.config.development';
// import routes from './routes';

const app = express();
const log = () => winston.info(...arguments);
const compiler = webpack(config);
const PORT = process.env.PORT || 1331;

const wdm = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
});

app.use(wdm);
app.use(webpackHotMiddleware(compiler));

const server = app.listen(PORT, 'localhost', err => {
  if (err) {
    return winston.log('error', err);
  }

  log(`Listening at http://localhost:${PORT}`);
});
const io = Socket(server);

process.on('SIGTERM', () => {
  log('Stopping dev server');
  wdm.close();
  server.close(() => {
    process.exit(0);
  });
});

io.on('connection', function(client) {
    console.log('Client connected...');

    client.on('join', function(data) {
        console.log(data);
    });

});
