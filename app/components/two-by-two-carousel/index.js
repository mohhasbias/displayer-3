/* global require, module */
const yo = require('yo-yo');

const carousel = require('../carousel');

module.exports = function({ carouselSetting, playlist }) {
  require('./index.scss');

  // split playlist into four
  const divider = 4;
  const totalPlaylist = (playlist && playlist.length) || 0;
  const numEachSplit = Math.max(Math.floor(totalPlaylist/divider), 1);
  
  let splitted = playlist || [];
  splitted = splitted.reduce(
    (acc, value, index) => {
      const targetIndex = Math.min(Math.floor(index/numEachSplit), divider-1);
      acc[targetIndex] = acc[targetIndex] || [];
      acc[targetIndex] = [].concat(acc[targetIndex], value);
      return acc;
    },
    []
  );

  return yo`
    <div class="two-by-two-carousel">
      <div class="row">
        <div class="col-md-6">
          ${carousel({
            carouselSetting,
            playlist: splitted[0]
          })}
        </div>
        <div class="col-md-6">
          ${carousel({
            carouselSetting,
            playlist: splitted[1]
          })}
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          ${carousel({
            carouselSetting,
            playlist: splitted[2]
          })}
        </div>
        <div class="col-md-6">
          ${carousel({
            carouselSetting,
            playlist: splitted[3]
          })}
        </div>
      </div>
    </div>
  `;
}
