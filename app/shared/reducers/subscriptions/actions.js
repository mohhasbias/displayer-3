/* global module */
const REQUEST_SUBSCRIPTIONS = 'REQUEST_SUBSCRIPTIONS';
const RECEIVE_SUBSCRIPTIONS = 'RECEIVE_SUBSCRIPTIONS';
const FAIL_SUBSCRIPTIONS = 'FAIL_SUBSCRIPTIONS';

function requestSubscriptions() {
  return {
    type: REQUEST_SUBSCRIPTIONS
  };
}

function receiveSubscriptions(data) {
  return {
    type: RECEIVE_SUBSCRIPTIONS,
    payload: {
      data
    }
  };
}

function failSubscriptions(error) {
  return {
    type: FAIL_SUBSCRIPTIONS,
    payload: {
      error
    }
  };
}

module.exports = {
  REQUEST_SUBSCRIPTIONS,
  RECEIVE_SUBSCRIPTIONS,
  FAIL_SUBSCRIPTIONS,

  requestSubscriptions,
  receiveSubscriptions,
  failSubscriptions
};
