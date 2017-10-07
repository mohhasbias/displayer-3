/* global require, module */
const page = require('page');

const store = require('../../shared/store');
const selectors = require('../../shared/selectors');

const schedulesActions = require('../../shared/reducers/schedules/actions');
const carouselIntervalActions = require('../../shared/reducers/carousel-interval/actions');

const displayPreviewPage = require('./index');

module.exports = function() {
  return displayPreviewPage(mapStoreToPage());
};

//////////////////////////////////////////
let selectedPlayerLayout = '2 x 2 Grids';
function mockPlayerLayout() {
  return selectedPlayerLayout;
}

function mapStoreToPage() {
  return {
    subscriptions: selectors.selectSubscriptionsWithSchedules(store.getState()),
    layoutOptions: ['2 x 2 Grids', 'No Grid'],
    selectedPlayerLayout: mockPlayerLayout(),
    // carouselInterval: 3000,
    carouselInterval: selectors.selectCarouselInterval(store.getState()),
    playlist: selectors.selectPlaylist(store.getState()),

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
    },
    onCarouselIntervalChange: (interval) => {
      store.dispatch(carouselIntervalActions.setCarouselInterval(interval));
    }
  };
}
