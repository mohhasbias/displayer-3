/* global require, module */

require('es6-promise').polyfill();
require('isomorphic-fetch');

const actions = require('./actions');

const initialChannelState = {
  isFetching: false,
  items: []
};

function channels(state = initialChannelState, action) {
  switch(action.type) {
    case actions.FETCH_CHANNELS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case actions.RECEIVE_CHANNELS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.payload.data
      });
    default:
      return state;
  }
}

const initialState = {
  [actions.ORDER_NONE]: initialChannelState,
  [actions.ORDER_TOTAL]: initialChannelState,
  [actions.ORDER_DATE_CREATED]: initialChannelState
};

module.exports = function(state = initialState, action) {
  switch(action.type) {
    case actions.FETCH_CHANNELS:
      return Object.assign({}, state, {
        [action.payload.order]: channels(state[action.payload.order], action)
      });
    case actions.RECEIVE_CHANNELS:
      return Object.assign({}, state, {
        [action.payload.order]: channels(state[action.payload.order], action)
      });
    default:
      return state;
  }
};
