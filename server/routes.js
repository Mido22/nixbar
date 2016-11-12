
/**
 * @flow
 */


const express = require('express');
const winston = require('winston');
const DB = require('./db');
// const await = require('asyncawait/await');
// const async = require('asyncawait/async');
const DB_ROUTE = '/db/';

function log() {
  winston.info(...arguments);
}

function loge() {
  winston.log('error', ...arguments)
}

const routes = express.Router();              // get an instance of the express Router

routes.get('/', (req, res) => {
  log('testing if the REST API works...');
  res.json({ message: 'It\'s alive!!! It\'s alive!!!' });
});

routes.get(`${DB_ROUTE}:dbName`, (req, res) => {
  DB.find(req.params.dbName, req.query).then(r => res.json(r)).catch(loge);
});


module.exports = routes;
