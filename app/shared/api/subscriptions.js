/* global require, module */
require('es6-promise').polyfill();
require('isomorphic-fetch');

var subscriptions = require('../../../data/subscriptions.json');

var channels = {
  'eWRhpRV': require('../../../data/channel-details-eWRhpRV.json'),
  '46Juzcyx': require('../../../data/channel-details-46Juzcyx.json'),
  '23TplPdS': require('../../../data/channel-details-23TplPdS.json')
};

function fetchSubscriptions(userId) {
  return new Promise(resolve => resolve(subscriptions));
}

function subscribeTo(userId, channelId) {
  subscriptions[channelId] = channels[channelId];

  return new Promise(resolve => resolve(subscriptions));
}

function unsubscribeFrom(userId, channelId) {
  delete subscriptions[channelId];

  return new Promise(resolve => resolve(subscriptions));
}

module.exports = {
  fetchSubscriptions,
  subscribeTo,
  unsubscribeFrom
};
