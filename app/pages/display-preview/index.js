/* global require, module */

const yo = require('yo-yo');

// components
const layout = require('../../components/layout');
const visibleList = require('../../components/visible-list');
const playerLayoutOptions = require('../../components/player-layout-options');
const carousel = require('../../components/carousel');

// render function
function render({
  subscriptions,
  onLogout,
  onToggleVisible,
  onSelect
}) {
  const carouselSetting = {
    interval: 3000,
    pause: null
  };

  var playlist = Object.keys(subscriptions.data)
    .map(channelId => {
      return subscriptions.data[channelId].visible? subscriptions.data[channelId].contents : [];
    })
    .reduce(
      (acc, contents) => acc.concat(contents),
      []
    );
  
  playlist = playlist.length? playlist : null;
  // console.log(playlist);

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
                options: ['2 x 2 Grids', 'No Grid'],
                onSelect: onSelect
              })}
            </div>
            <div class="col-sm-7">
              <div class="tv-placeholder">
                ${carousel({
                  carouselSetting: carouselSetting,
                  playlist: playlist
                })}
              </div>
            </div>
          </div>
        </div>
      `
    })}
  `;
}

module.exports = render;
