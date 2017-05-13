/* global require */
const diffhtml = require('diffhtml');
const yo = require('yo-yo');
const page = require('page');

// components
const layout = require('../../components/layout');
const firstSubscriptions = require('../../components/first-subscriptions');
const navTabDetails = require('../../components/nav-tab-details');
const subscriptionsList = require('../../components/subscriptions-list');
const inputTypeahead = require('../../components/input-typeahead');

// app state
const store = require('../../shared/store');
const selectors = require('../../shared/selectors');

const subscriptionsPageActions = require('../../shared/reducers/subscriptions-page/actions');
const channelEffects = require('../../shared/reducers/channels/effects');
const subscriptionsPageEffects = require('../../shared/reducers/subscriptions-page/effects');
const subscriptionsEffects = require('../../shared/reducers/subscriptions/effects');

// routing
page('/subscriptions', () => {
  // subscribe store updates
  store.subscribe(() => {
    // re-render
    subscriptionPage(mapStoreToPage());
  });
  // load required data
  // handover dispatch to effects
  channelEffects.fetchChannelList()(store.dispatch);
  channelEffects.fetchChannelMostUploaded()(store.dispatch);
  channelEffects.fetchNewestChannels()(store.dispatch);
  subscriptionsEffects.fetchSubscriptions('userid')(store.dispatch);
});

// store mapper
function mapStoreToPage() {
  return {
    mostUploadedContent: selectors.selectChannelMostUploaded(store.getState()).data, 
    newestChannel: selectors.selectNewestChannels(store.getState()).data, 
    channels: selectors.selectChannelList(store.getState()).data, 
    subscriptions: selectors.selectSubscriptions(store.getState()),
    selectedChannel: selectors.selectSelectedChannelWithSubscribeStatus(store.getState()),
    activeTabIndex: selectors.selectActiveTabIndex(store.getState()),
    activeDetailsTab: selectors.selectActiveDetailsTab(store.getState()),
    onTabSelect: (index) => {
      store.dispatch(subscriptionsPageActions.setActiveTabIndex(index));
    },
    onItemClick: (channelId) => {
      subscriptionsPageEffects.fetchSelectedChannel(channelId)(store.dispatch);
    },
    onSearchInputChange: (channel) => {
      if(channel) {
        subscriptionsPageEffects.fetchSelectedChannel(channel.id)(store.dispatch);
      }
    },
    onTabDetailsSelect: (tabName) => {
      store.dispatch(subscriptionsPageActions.setActiveDetailsTab(tabName));
    },
    onSelectChannel: (channelId) => {
      var channelDetails = selectors.selectSubscriptions(store.getState()).data[channelId];
      store.dispatch(subscriptionsPageActions.setSelectedChannel(channelDetails));
    },
    onToggleSubscribe: () => {
      var selectedChannel = selectors.selectSelectedChannelWithSubscribeStatus(store.getState()).data;
      var channelId = selectedChannel.id;
      if(selectedChannel.subscribed) {
        subscriptionsEffects.unsubscribeFrom('userid', channelId)(store.dispatch);
      } else {
        subscriptionsEffects.subscribeTo('userid', channelId)(store.dispatch);
      }
    },
    onLogout: () => {
      console.log('logout');
      page.redirect('/logout');
    }
  };
}

// render function
function subscriptionPage({ 
  mostUploadedContent, 
  newestChannel, 
  channels, 
  subscriptions,
  selectedChannel,
  activeTabIndex,
  activeDetailsTab,
  onTabSelect,
  onItemClick,
  onSearchInputChange,
  onTabDetailsSelect,
  onSelectChannel,
  onToggleSubscribe,
  onLogout
}) {
  // inject css
  require('./index.scss');

  // data preparation
  mostUploadedContent = mostUploadedContent.map( channel => {
    return Object.assign({}, channel, {
      total: `${channel.total} contents`
    });
  });

  channels = channels.map(channel => {
    return Object.assign({}, channel, {
      name: channel.channelName
    });
  });

  // html template
  var html = yo`
    ${layout({
      loggedIn: true,
      onLogout: onLogout,
      className: 'subscriptions-page',
      children: yo`
        <div class="container container-subscriptions">
          ${(!subscriptions.isFetching || '') &&
            (!Object.keys(subscriptions.data).length || '') &&
            (!selectedChannel.data || '') && 
            yo`
              <div class="row">
                <div class="col-sm-10 col-sm-offset-1">
                  ${firstSubscriptions({
                    onSearchInputChange: onSearchInputChange,
                    channels: channels,
                    labels: [ 'MOST UPLOADED CONTENT', 'NEWEST CHANNEL' ],
                    data: [ mostUploadedContent, newestChannel ],
                    columns: [ ['channelName', 'total'], ['channelName', 'timeago'] ],
                    activeTabIndex: activeTabIndex,
                    onTabSelect: onTabSelect,
                    onItemClick: onItemClick
                  })}
                </div>
              </div>
            `}
          <div class="row">
            ${(Object.keys(subscriptions.data).length || '') &&
              yo`
                <div class="col-sm-3 col-sm-offset-1">
                  ${subscriptionsList({
                    subscriptions: subscriptions.data,
                    selectedChannel: selectedChannel.data,
                    onSelectChannel: onSelectChannel
                  })}
                </div>
              `
            }
            <div class="${Object.keys(subscriptions.data).length? 'col-sm-7' : 'col-sm-10 col-sm-offset-1'}">
              ${(selectedChannel.data || Object.keys(subscriptions.data).length || '') &&
                yo`
                  <form class="search-form">
                    <div class="row">
                      <div class="col-sm-6">
                        ${inputTypeahead({
                          source: channels,
                          onSearchInputChange: onSearchInputChange
                        })}
                      </div>
                    </div>
                  </form>
                `
              }
              ${( (selectedChannel.data && !selectedChannel.error) || '') &&
                yo`
                  <div>
                    <div class="media">
                      <div class="media-left">
                        <a href="javascript:;">
                          <img class="media-object" src="${selectedChannel.data.channelLogo}" alt="logo hima mmb">
                        </a>
                      </div>
                      <div class="media-body">
                        <h1 class="media-heading">${selectedChannel.data.channelName}</h1>
                        <p class="text-muted">${`${selectedChannel.data.contents.length} contents`}</p>
                      </div>
                      <div class="media-right">
                        ${(selectedChannel.data.subscribed || '') &&
                          yo`
                            <button class="btn btn-danger" onclick=${onToggleSubscribe} >
                              unsubscribe
                            </button>
                          `
                        }
                        ${(!selectedChannel.data.subscribed || '') &&
                          yo`
                          <button class="btn btn-success" onclick=${onToggleSubscribe} >
                            + subscribe
                          </button>
                          `
                        }
                      </div>
                    </div>
                    ${navTabDetails({
                      channel: selectedChannel.data,
                      activeTab: activeDetailsTab,
                      onTabSelect: onTabDetailsSelect,
                      colSize: Object.keys(subscriptions.data).length? 'col-sm-4' : 'col-sm-2'
                    })}
                  </div>
                `
              }
            </div>
          </div>
        </div>
      `
    })}
  `;

  // render to DOM
  diffhtml.innerHTML(document.getElementById('app'), html);
}
