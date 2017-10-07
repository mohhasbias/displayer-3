/* global require, module */

const displayPage = require('./index');

const store = require('../../shared/store');
const selectors = require('../../shared/selectors');

module.exports = function() {
  return displayPage(mapStoreToPage());
};

////////////////////////////////////
function mapStoreToPage() {
  return {
    carouselSetting: {
      pause: null,
      interval: selectors.selectCarouselInterval(store.getState())
    },
    playlist: selectors.selectPlaylist(store.getState())
  };
}
