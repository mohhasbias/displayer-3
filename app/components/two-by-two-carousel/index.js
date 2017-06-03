/* global require, module */
const yo = require('yo-yo');

const carousel = require('../carousel');

module.exports = function({ carouselSetting, playlist }) {
  require('./index.scss');

  return yo`
    <div class="two-by-two-carousel">
      <div class="row">
        <div class="col-md-6">
          ${carousel({
            carouselSetting,
            playlist
          })}
        </div>
        <div class="col-md-6">
          ${carousel({
            carouselSetting,
            playlist
          })}
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          ${carousel({
            carouselSetting,
            playlist
          })}
        </div>
        <div class="col-md-6">
          ${carousel({
            carouselSetting,
            playlist
          })}
        </div>
      </div>
    </div>
  `;
}
