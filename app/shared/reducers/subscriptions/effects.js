/* global require, module */

const ACTIONS = require('./actions');
const subscriptionsAPI = require('../../api/subscriptions');

function fetchSubscriptions(userId, dispatch) {
  subscriptionsAPI.fetchSubscriptions(
    userId,
    (json) => dispatch(ACTIONS.receiveSubscriptions(json)),
    (err) => dispatch(ACTIONS.failSubscriptions(err))
  );

  return ACTIONS.requestSubscriptions();
}

module.exports = {
  fetchSubscriptions
};
