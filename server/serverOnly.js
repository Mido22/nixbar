
/**
 * Setup and run the development server for Hot-Module-Replacement
 * https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
 * @flow
 */

const express = require('express');
const winston = require('winston');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 1331;

function log() {
  winston.info(...arguments);
}

function loge() {
  winston.log('error', ...arguments)
}

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', routes);

const server = app.listen(PORT, 'localhost', err => {
  if (err) {
    return loge(err);
  }

  log(`Listening at http://localhost:${PORT}`);
});
// function stopServer() {
//   log('Stopping dev server............');
//   server.close(() => process.exit(0));
// }
// process.on('SIGTERM', stopServer);
// // process.on('SIGINT', stopServer);
// process.on('SIGINT', function() {
//     console.log("Caught interrupt signal");
//
//     if (i_should_exit)
//         process.exit();
// });
// process.on('SIGINT', function() {
//     process.exit();
// });
// first create a generic "terminator"
