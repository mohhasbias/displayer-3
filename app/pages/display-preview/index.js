/* global require, module */

const yo = require('yo-yo');

// components
const layout = require('../../components/layout');
const visibleList = require('../../components/visible-list');
const playerLayoutOptions = require('../../components/player-layout-options');
const carousel = require('../../components/carousel');
const twoByTwoCarousel = require('../../components/two-by-two-carousel');

// render function
function render({
  subscriptions,
  onLogout,
  onToggleVisible,
  layoutOptions,
  onSelectLayout,
  selectedPlayerLayout,
  carouselInterval,
  playlist
}) {
  const carouselSetting = {
    interval: carouselInterval || 3000,
    pause: null
  };

  require('./index.scss');

  return yo`
    ${layout({
      loggedIn: true,
      onLogout: onLogout,
      children: yo`
        <div class="container container-display-preview">
          <div class="row">
            <div class="col-sm-3 col-sm-offset-1">
              ${visibleList({
                subscriptions: subscriptions.data,
                onToggleVisible: onToggleVisible
              })}
              ${playerLayoutOptions({
                options: layoutOptions,
                onSelect: onSelectLayout,
                selectedValue: selectedPlayerLayout
              })}
            </div>
            <div class="col-sm-7">
              <div class="tv-placeholder">
                ${ (selectedPlayerLayout === 'No Grid' || '') &&
                  carousel({
                    carouselSetting: carouselSetting,
                    playlist: playlist
                  })
                }
                ${ (selectedPlayerLayout === '2 x 2 Grids' || '') &&
                  twoByTwoCarousel({
                    carouselSetting: carouselSetting,
                    playlist: playlist   
                  })
                }
              </div>
              <div class="text-center">
                Duration interval for each content: 
                <select>
                  <option value="1" ${carouselSetting.interval === 1*1000? 'selected' :''}>1</option>
                  <option value="2" ${carouselSetting.interval === 2*1000? 'selected' :''}>2</option>
                  <option value="3" ${carouselSetting.interval === 3*1000? 'selected' :''}>3</option>
                  <option value="4" ${carouselSetting.interval === 4*1000? 'selected' :''}>4</option>
                  <option value="5" ${carouselSetting.interval === 5*1000? 'selected' :''}>5</option>
                </select>
                seconds
              </div>
            </div>
          </div>
        </div>
      `
    })}
  `;
}

module.exports = render;
