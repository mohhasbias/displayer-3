/* global require, module */

require('es6-promise').polyfill();
require('isomorphic-fetch');

const actions = require('./actions');

function channels(state = {
  isFetching: false,
  items: []
}, action) {
  switch(action.type) {
    case actions.FETCH_CHANNELS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case actions.RECEIVE_CHANNELS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.payload
      });
    default:
      return state;
  }
}

module.exports = function(state = {}, action) {
  switch(action.type) {
    case actions.FETCH_CHANNELS:
      var dispatch = action.payload;
      fetch('/data/channels.json')
        .then(res => res.json())
        .then(json => {
          dispatch(actions.receiveChannels(json))
        });
      
      return Object.assign({}, state, {
        list: channels(state.list, action)
      });
    case actions.RECEIVE_CHANNELS:
      return Object.assign({}, state, {
        list: channels(state.list, action)
      });
    default:
      return state;
  }
};
