/* global require, module */

const { createStore, combineReducers } = require('redux');

// cross page reducer
const channelsReducer = require('./reducers/channels');

// page reducer
const subscriptionsPageReducer = require('./reducers/subscriptions-page');

const reducer = combineReducers({
  channels: channelsReducer,
  subscriptionsPage: subscriptionsPageReducer
});

var store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

module.exports = store;
