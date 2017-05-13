/* global require, module */

const ACTIONS = require('./actions');
const subscriptionsAPI = require('../../api/subscriptions');

function fetchSubscriptions(userId) {
  return dispatch => {
    dispatch(ACTIONS.requestSubscriptions());

    subscriptionsAPI.fetchSubscriptions(userId)
      .then(json => dispatch(ACTIONS.receiveSubscriptions(json)))
      .catch(err => dispatch(ACTIONS.failSubscriptions(err)));
  };
}

function subscribeTo(userId, channelId) {
  return dispatch => {
    dispatch(ACTIONS.requestSubscriptions());

    subscriptionsAPI.subscribeTo(userId,channelId)
      .then(json => dispatch(ACTIONS.receiveSubscriptions(json)))
      .catch(err => dispatch(ACTIONS.failSubscriptions(err)));
  };  
}

function unsubscribeFrom(userId, channelId) {
  return dispatch => {
    dispatch(ACTIONS.requestSubscriptions());

    subscriptionsAPI.unsubscribeFrom(userId,channelId)
      .then(json => dispatch(ACTIONS.receiveSubscriptions(json)))
      .catch(err => dispatch(ACTIONS.failSubscriptions(err)));
  };
}

module.exports = {
  fetchSubscriptions,
  subscribeTo,
  unsubscribeFrom
};
