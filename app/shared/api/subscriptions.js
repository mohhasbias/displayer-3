/* global require, module */

require('es6-promise').polyfill();
require('isomorphic-fetch');

function fetchSubscriptions(userId, onSuccess, onFailure) {
  fetch('/data/subscriptions.json')
    .then(res => res.json())
    .then(onSuccess)
    .catch(onFailure);
}

module.exports = {
  fetchSubscriptions
};
