/* global require, module */

const yo = require('yo-yo');

const multiLayoutCarousel = require('../../components/multi-layout-carousel');

// page renderer
function render({
  carouselSetting,
  playlist
}) {
  return yo`
    ${multiLayoutCarousel({
      // layout: 'No Grid',
      layout: '2 x 2 Grids',
      carouselSetting,
      playlist
    })}
  `;
}

module.exports = render;
