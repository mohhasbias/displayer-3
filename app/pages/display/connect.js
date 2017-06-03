/* global require, module */

const displayPage = require('./index');

module.exports = function() {
  return displayPage(mapStoreToPage());
};

////////////////////////////////////
const carouselSetting = {
  interval: 3000,
  pause: null
};

const selectedChannel = {
  data: null
};

const playlist = selectedChannel.data && selectedChannel.data.contents;

function mapStoreToPage() {
  return {
    carouselSetting,
    playlist
  };
}
