/* global require, module, __filename */

const yo = require('yo-yo');
const page = require('page');
const objectAssign = require('object-assign');

// components
const layout = require('../../components/layout');
const visibleList = require('../../components/visible-list');
const playerLayoutOptions = require('../../components/player-layout-options');
const carousel = require('../../components/carousel');

// app store
const store = require('../../shared/store');
const selectors = require('../../shared/selectors');

const subscriptionsEffects = require('../../shared/reducers/subscriptions/effects');

// routing
var storeUnsubscribe;
var urlPath = '/display-preview';
page(urlPath, () => {
  storeUnsubscribe = store.subscribe(() => {
    console.log(__filename, ' listening...');
    displayPreviewPage(mapStoreToPage());
  });

  subscriptionsEffects.fetchSubscriptions('userid')(store.dispatch);
});

page.exit(urlPath, (ctx, next) => {
  storeUnsubscribe();
  next();
});

const schedule = {};
function mockSubscriptions() {
  const subscriptions = selectors.selectSubscriptions(store.getState());
  Object.keys(subscriptions.data).forEach(channelId => {
    subscriptions.data[channelId] = objectAssign({}, subscriptions.data[channelId], {
      visible: schedule[channelId] || false
    });
  });
  return subscriptions;
}

function mapStoreToPage() {
  return {
    // subscriptions: selectors.selectSubscriptions(store.getState()),
    subscriptions: mockSubscriptions(),
    selectedChannel: selectors.selectSelectedChannel(store.getState()),

    onLogout: () => page.redirect('/logout'),
    onToggleVisible: (channelId) => {
      schedule[channelId] = !schedule[channelId];
      store.dispatch({
        type: '@@UPDATE'
      });
    },
    onSelect: (playerLayout) => console.log('selected layout: ', playerLayout)
  };
}

// render function
function displayPreviewPage({
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

  var html = yo`
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
                subscriptions: subscriptions.data,
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

  yo.update(
    document.getElementById('app'),
    yo`<div id="app">${html}</div>`
  );
}

module.exports = displayPreviewPage;
