
import {log, loge, APP_LOCATION} from '../utils/common';

const DB_URL_ROOT = `${APP_LOCATION}/api/db`;

export function get(db, query) {
  return fetch(`${DB_URL_ROOT}/${db}?${queryify(query)}`).then(jsonify);
}

function jsonify(res) {
  return res.json();
}

function queryify(jsonObj) {
  return Object.keys(jsonObj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(jsonObj[k])}`).join('&');
}
