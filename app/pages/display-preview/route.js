/* global require, module */
const store = require('../../shared/store');
const subscriptionsEffects = require('../../shared/reducers/subscriptions/effects');
const component = require('./connect');

const urlPath = '/display-preview';
function onEnterPath() {
  subscriptionsEffects.fetchSubscriptions('userid')(store.dispatch);
}

module.exports = {
  urlPath,
  component,
  onEnterPath
};
