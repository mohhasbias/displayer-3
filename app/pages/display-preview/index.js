/* global require, module */

const diffhtml = require('diffhtml');
const yo = require('yo-yo');
const page = require('page');
const objectAssign = require('object-assign');

// components
const layout = require('../../components/layout');
const visibileList = require('../../components/visible-list');
const carousel = require('../../components/carousel');

// app store
const store = require('../../shared/store');
const selectors = require('../../shared/selectors');

const subscriptionsEffects = require('../../shared/reducers/subscriptions/effects');

// routing
page('/display-preview', () => {
  store.subscribe(() => {
    displayPreviewPage(mapStoreToPage());
  });

  subscriptionsEffects.fetchSubscriptions('userid')(store.dispatch);
});

function mapStoreToPage() {
  return {
    subscriptions: selectors.selectSubscriptions(store.getState()),
    selectedChannel: selectors.selectSelectedChannel(store.getState()),

    onLogout: () => page.redirect('/logout'),
    onToggleVisible: (channelId) => console.log('toggle visibility', channelId)
  };
}

// render function
function displayPreviewPage({
  subscriptions,
  onLogout,
  onToggleVisible
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

  var html = yo`
    ${layout({
      loggedIn: true,
      onLogout: onLogout,
      children: yo`
        <div class="container container-display-preview">
          <div class="row">
            <div class="col-sm-3 col-sm-offset-1">
              ${visibileList({
                subscriptions: subscriptions.data,
                onToggleVisible: onToggleVisible
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

  diffhtml.innerHTML(document.getElementById('app'), html);
}

module.exports = displayPreviewPage;
