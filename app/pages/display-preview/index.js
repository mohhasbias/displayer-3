/* global require, module */

const diffhtml = require('diffhtml');
const yo = require('yo-yo');
const page = require('page');

// components
const layout = require('../../components/layout');
const subscriptionsList = require('../../components/subscriptions-list');
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

    onLogout: () => page.redirect('/logout')
  };
}

// render function
function displayPreviewPage({
  subscriptions,
  onLogout
}) {
  const carouselSetting = {
    interval: 3000,
    pause: null
  };

  const playlist = Object.keys(subscriptions.data)
    .map(channelId => {
      return subscriptions.data[channelId].contents;
    })
    .reduce(
      (acc, contents) => acc.concat(contents),
      []
    );
  
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
              ${subscriptionsList({
                subscriptions: subscriptions.data
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
