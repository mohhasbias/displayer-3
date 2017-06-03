/* global require, module */

const yo = require('yo-yo');

const carousel = require('../../components/carousel');

// page renderer
function render({
  carouselSetting,
  playlist
}) {
  return yo`
    ${carousel({
      carouselSetting,
      playlist
    })}
  `;
}

module.exports = render;
