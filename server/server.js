
/**
 * Setup and run the development server for Hot-Module-Replacement
 * https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
 * @flow
 */

import express from 'express';
import webpack from 'webpack';
import winston from 'winston';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import bodyParser from 'body-parser';

import config from '../webpack.config.development';
import routes  from './routes';

const app = express();
const log = () => winston.info(...arguments);
const loge = () => winston.log('error', ...arguments);
const compiler = webpack(config);
const PORT = process.env.PORT || 1331;

const wdm = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(wdm);
app.use(webpackHotMiddleware(compiler));
app.use('/api', routes);

const server = app.listen(PORT, 'localhost', err => {
  if (err) {
    return loge(err);
  }

  log(`Listening at http://localhost:${PORT}`);
});

process.on('SIGTERM', () => {
  log('Stopping dev server............');
  wdm.close();
  server.close(() => process.exit(0));
});
