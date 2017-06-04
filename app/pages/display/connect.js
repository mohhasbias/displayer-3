/* global require, module */

const displayPage = require('./index');

const store = require('../../shared/store');
const selectors = require('../../shared/selectors');

module.exports = function() {
  return displayPage(mapStoreToPage());
};

////////////////////////////////////
const carouselSetting = {
  interval: 10000,
  pause: null
};

function mapStoreToPage() {
  return {
    carouselSetting,
    playlist: selectors.selectPlaylist(store.getState())
  };
}
