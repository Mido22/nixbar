
const fs = require('fs');
const path = require('path');
const Datastore = require('nedb');
const Bluebird = require('bluebird');
const winston = require('winston');

function log() {   winston.info(...arguments); }
function loge() {   winston.log('error', ...arguments); }


module.exports = {
  find,
  findOne,
  create,
};

const DB_DIR = 'datastore';
const dbs = {};
const pfs = Bluebird.promisifyAll(fs);
const DB_EXT = '.nedb';

function query(queryObj) {
  return Promise.resolve(Object.keys(dbs));
}
function create(dbName, obj) {
  return getDb(dbName).then(db => db.saveAsync(obj)).catch(loge);
}

function find(dbName, obj) {
  return getDb(dbName).then(db => db.findAsync(obj)).catch(loge);
}

function findOne(dbName, obj) {
  return getDb(dbName).then(db => db.findOneAsync(obj)).catch(loge);
}

function loadAllDbs() {
  return pfs.readdirAsync(DB_DIR)
    .then(res => {
      res.filter(e => path.parse(e).ext === '.nedb').forEach(loadDb);
      return log('Databases loaded: ', Object.keys(dbs));
    }).catch(e => winston.error(e));
}

function getDb(dbName) {
  if (dbs[dbName]) {
    return Promise.resolve(dbs[dbName]);
  }
  loadDb(dbName);
  return Promise.resolve(dbs[dbName]);
}

function loadDb(name) {
  if (name.indexOf(DB_EXT) === -1) {
    name = name + DB_EXT;
  }
  const dbName = path.parse(name).name;
  const dbName2 = name.replace(DB_EXT, '');
  dbs[dbName2] = Bluebird.promisifyAll(new Datastore({
    filename: path.join(DB_DIR, name),
    autoload: true }));
}
