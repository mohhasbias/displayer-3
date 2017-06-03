/* global require, module */
const objectAssign = require('object-assign');
const page = require('page');

const store = require('../../shared/store');
const selectors = require('../../shared/selectors');

const displayPreviewPage = require('./index');

const schedule = {};
function mockSubscriptions() {
  const subscriptions = selectors.selectSubscriptions(store.getState());
  Object.keys(subscriptions.data).forEach(channelId => {
    subscriptions.data[channelId] = objectAssign({}, subscriptions.data[channelId], {
      visible: schedule[channelId] || false
    });
  });
  return subscriptions;
}

let selectedPlayerLayout = '2 x 2 Grids';
function mockPlayerLayout() {
  return selectedPlayerLayout;
}

function mapStoreToPage() {
  return {
    // subscriptions: selectors.selectSubscriptions(store.getState()),
    subscriptions: mockSubscriptions(),
    selectedChannel: selectors.selectSelectedChannel(store.getState()),
    layoutOptions: ['2 x 2 Grids', 'No Grid'],
    selectedPlayerLayout: mockPlayerLayout(),

    onLogout: () => page.redirect('/logout'),
    onToggleVisible: (channelId) => {
      schedule[channelId] = !schedule[channelId];
      store.dispatch({
        type: '@@UPDATE'
      });
    },
    onSelectLayout: (playerLayout) => {
      console.log('selected layout: ', playerLayout);
      selectedPlayerLayout = playerLayout;
      store.dispatch({
        type: '@@UPDATE'
      });
    }
  };
}

module.exports = function() {
  return displayPreviewPage(mapStoreToPage());
};
