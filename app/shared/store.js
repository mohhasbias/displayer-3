/* global require, module */

const { createStore, combineReducers } = require('redux');

// list of reducers
const channelsReducer = require('./reducers/channels');
const subscriptionsPageReducer = require('./reducers/subscriptions-page');
const subscriptionsReducer = require('./reducers/subscriptions');

// app combined reducer
const reducer = combineReducers({
  channels: channelsReducer,
  subscriptionsPage: subscriptionsPageReducer,
  subscriptions: subscriptionsReducer
});

var store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// selectors
function selectSubscriptions(state) {
  return state.subscriptions;
}

module.exports = Object.assign({}, store, {
  selectSubscriptions
});
