/* global require, module */

require('es6-promise').polyfill();
require('isomorphic-fetch');

const config = require('./config.json');

const ORDER_NONE = 'ORDER_NONE';
const ORDER_BY_TOTAL = 'ORDER_BY_TOTAL';
const ORDER_BY_DATE_CREATED = 'ORDER_BY_DATE_CREATED';

function fetchChannels(order, onSuccess, onFailure) {
  const fetchURL = {
    [ORDER_NONE]: config.BACKEND_BASE_URL + config.CHANNEL_LIST_URI,
    [ORDER_BY_TOTAL]: '/data/most-uploaded-channels.json',
    [ORDER_BY_DATE_CREATED]: '/data/newest-channels.json'
  };

  fetch(fetchURL[order])
    .then(res => res.json())
    .then(json => onSuccess(json))
    .catch(err => onFailure(err));
}

module.exports = {
  ORDER_NONE,
  ORDER_BY_TOTAL,
  ORDER_BY_DATE_CREATED,

  fetchChannels
};
