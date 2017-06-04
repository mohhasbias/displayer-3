/* global module, require */
const yo = require('yo-yo');

const carousel = require('../carousel');
const twoByTwoCarousel = require('../two-by-two-carousel');

const render = ({
  layout,
  carouselSetting,
  playlist
}) => {
  // inject css
  require('./index.scss');

  return yo`
    <div class="multi-layout-carousel">
      ${((layout === 'No Grid') || '') &&
        carousel({
          carouselSetting,
          playlist
        })
      }
      ${((layout === '2 x 2 Grids') || '') &&
        twoByTwoCarousel({
          carouselSetting,
          playlist
        })
      }
    </div>
  `;
}

module.exports = render;
