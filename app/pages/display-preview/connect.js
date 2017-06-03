/* global require, module */
const page = require('page');

const store = require('../../shared/store');
const selectors = require('../../shared/selectors');

const schedulesActions = require('../../shared/reducers/schedules/actions');

const displayPreviewPage = require('./index');

let selectedPlayerLayout = '2 x 2 Grids';
function mockPlayerLayout() {
  return selectedPlayerLayout;
}

function mapStoreToPage() {
  return {
    subscriptions: selectors.selectSubscriptionsWithSchedules(store.getState()),
    layoutOptions: ['2 x 2 Grids', 'No Grid'],
    selectedPlayerLayout: mockPlayerLayout(),
    carouselInterval: 5000,

    onLogout: () => page.redirect('/logout'),
    onToggleVisible: (channelId) => {
      const subscriptions = selectors.selectSubscriptionsWithSchedules(store.getState());
      if(subscriptions.data[channelId].visible) {
        store.dispatch(schedulesActions.removeChannel(channelId));
      } else {
        store.dispatch(schedulesActions.addChannel(channelId)); 
      }
    },
    onSelectLayout: (playerLayout) => {
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
