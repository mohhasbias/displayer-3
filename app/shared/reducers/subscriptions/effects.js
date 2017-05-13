/* global require, module */

const ACTIONS = require('./actions');
const subscriptionsAPI = require('../../api/subscriptions');

function fetchSubscriptions(userId) {
  return (dispatch) => {
    dispatch(ACTIONS.requestSubscriptions());

    subscriptionsAPI.fetchSubscriptions(
      userId,
      (json) => dispatch(ACTIONS.receiveSubscriptions(json)),
      (err) => dispatch(ACTIONS.failSubscriptions(err))
    );
  };
}

module.exports = {
  fetchSubscriptions
};
