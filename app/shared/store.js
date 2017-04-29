/* global require, module */

const { createStore, combineReducers } = require('redux');

const channelsReducer = require('./reducers/channels');

const reducer = combineReducers({
  channels: channelsReducer
});

var store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

module.exports = store;
