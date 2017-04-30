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
  var dispatch;

  const fetchURL = {
    [actions.ORDER_NONE]: '/data/channels.json',
    [actions.ORDER_TOTAL]: '/data/most-uploaded-channels.json',
    [actions.ORDER_DATE_CREATED]: '/data/newest-channels.json'
  }

  const receiveChannel = {
    [actions.ORDER_NONE]: actions.receiveChannelList,
    [actions.ORDER_TOTAL]: actions.receiveChannelMostUploaded,
    [actions.ORDER_DATE_CREATED]: actions.receiveNewestChannels
  }

  switch(action.type) {
    case actions.FETCH_CHANNELS:
      dispatch = action.payload.dispatch;

      fetch(fetchURL[action.payload.order])
        .then(res => res.json())
        .then(json => dispatch(receiveChannel[action.payload.order](json)));

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
