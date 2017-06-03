/* global require, module */
const store = require('../../shared/store');
const subscriptionsEffects = require('../../shared/reducers/subscriptions/effects');
const component = require('./connect');

// routing
// let storeUnsubscribe;
// const urlPath = '/display-preview';
// page(urlPath, () => {
//   storeUnsubscribe = store.subscribe(displayPreviewPage);

//   subscriptionsEffects.fetchSubscriptions('userid')(store.dispatch);
// });

// page.exit(urlPath, (ctx, next) => {
//   storeUnsubscribe();
//   next();
// });

const urlPath = '/display-preview';
function onEnterPath() {
  subscriptionsEffects.fetchSubscriptions('userid')(store.dispatch);
}

module.exports = {
  urlPath,
  component,
  onEnterPath
}