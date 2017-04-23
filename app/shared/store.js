var { createStore, combineReducers } = require('redux');

var page = require('./reducers/page');

var reducers = combineReducers({
  page
});

var store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

module.exports = store;
