var diffhtml = require('diffhtml');
var yo = require('yo-yo');
var page = require('page');
var $ = require('jquery');
var holderjs = require('holderjs');

// load jquery plugin
require('bootstrap-3-typeahead');

// components
var layout = require('../../components/layout');
var navTabData = require('../../components/nav-tab-data');
var firstSubscriptions = require('../../components/first-subscriptions');
var navTabDetails = require('../../components/nav-tab-details');

// routing
page('/subscriptions', () => {
  subscriptionPage();
});

// state
const initialState = {
  activeTabIndex: 0,
  activeDetailsTab: 'Contents',
  subscriptions: {
    // "eWRhpRV": require('../../../data/channel-details-eWRhpRV.json')
  },
  // selectedChannel: require('../../../data/channel-details.json'),
  mostUploadedContent: require('../../../data/most-uploaded-channels.json'),
  newestChannel: require('../../../data/newest-channels.json'),
  channels: require('../../../data/channels.json')
};

// state helper
var state = initialState;

function setState(partialState) {
  state = Object.assign({}, state, partialState);
  // console.log(state);
  // re-render
  subscriptionPage();
}

// event handler
function onTabSelect(index) {
  setState({
    activeTabIndex: index
  });
}

function onTabDetailsSelect(tabName) {
  setState({
    activeDetailsTab: tabName
  });
}

function isSubscribed(channelId) {
  return state.subscriptions[channelId]? true: false;
}

function setSelectedChannel(channelId) {
  var channelDetails = {};
  switch(channelId) {
    case 'eWRhpRV':
      channelDetails = require('../../../data/channel-details-eWRhpRV.json');
      break;
    case '23TplPdS':
      channelDetails = require('../../../data/channel-details-23TplPdS.json');
      break;
  }

  setState({
    selectedChannel: Object.assign({}, channelDetails, {
      subscribed: isSubscribed(channelDetails.id)
    })
  });
}

function onSearchInputChange(channel) {
  setSelectedChannel(channel.id);
}

function onToggleSubscribe() {
  setState({
    selectedChannel: Object.assign({}, state.selectedChannel, {
      subscribed: !state.selectedChannel.subscribed
    })
  });
  // update subscriptions
  if(state.selectedChannel.subscribed) {
    setState({
      subscriptions: Object.assign({}, state.subscriptions, {
        [state.selectedChannel.id]: state.selectedChannel
      })
    });  
  } else {
    delete state.subscriptions[state.selectedChannel.id];
    setState({
      subscriptions: state.subscriptions
    });
  }
}

function onItemClick() {
  setState({
    selectedChannel: require('../../../data/channel-details.json')
  });
}

function onLogout() {
  state = initialState;
  page.redirect('/logout');
}

// render function
function subscriptionPage() {
  // inject css
  require('./index.scss');

  // data preparation
  var mostUploadedContent = state.mostUploadedContent;
  mostUploadedContent = mostUploadedContent.map( channel => {
    return Object.assign({}, channel, {
      total: `${channel.total} contents`
    });
  });

  var newestChannel = state.newestChannel;

  var channels = state.channels;
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
          ${(!Object.keys(state.subscriptions).length || '') &&
            (!state.selectedChannel || '') && 
            yo`
              <div class="row">
                <div class="col-sm-10 col-sm-offset-1">
                  ${firstSubscriptions({
                    onSearchInputChange: onSearchInputChange,
                    channels: channels,
                    labels: [ 'MOST UPLOADED CONTENT', 'NEWEST CHANNEL' ],
                    data: [ mostUploadedContent, newestChannel ],
                    activeTabIndex: state.activeTabIndex,
                    onTabSelect: onTabSelect,
                    onItemClick: onItemClick
                  })}
                </div>
              </div>
            `}
          <div class="row">
            ${(Object.keys(state.subscriptions).length || '') &&
              yo`
                <div class="col-sm-3 col-sm-offset-1">
                  <div class="panel panel-default">
                    <div class="panel-heading">
                      <h3 class="panel-title">List of subscribed channel</h3>
                    </div>
                    <div class="list-group">
                      ${Object.keys(state.subscriptions).map(key => {
                        var activeClass = state.subscriptions[key].id === state.selectedChannel.id? 'active' : '';
                        return yo`
                          <a href="javascript:;" class="list-group-item ${activeClass}" onclick=${() => setSelectedChannel(state.subscriptions[key].id)} >
                            <span class="badge">${state.subscriptions[key].contents.length}</span>
                            ${state.subscriptions[key].channelName}
                          </a>
                        `;
                      })}
                    </div>
                  </div>
                </div>
              `
            }
            <div class="${Object.keys(state.subscriptions).length? 'col-sm-7' : 'col-sm-10 col-sm-offset-1'}">
              ${(state.selectedChannel || '') &&
                yo`
                  <form class="search-form">
                    <div class="row">
                      <div class="col-sm-6">
                        <input 
                          id="search-input-small" 
                          type="text" 
                          class="form-control" 
                          onchange=${() => {
                            var item = $('#search-input-small').typeahead('getActive');
                            // console.log(item);
                            onSearchInputChange(item);
                          }}
                          autocomplete="off"
                          >
                      </div>
                    </div>
                  </form>
                `
              }
              ${(state.selectedChannel || '') &&
                yo`
                  <div>
                    <div class="media">
                      <div class="media-left">
                        <a href="javascript:;">
                          <img class="media-object" src="assets/i/hima-mmb.png" alt="logo hima mmb">
                        </a>
                      </div>
                      <div class="media-body">
                        <h1 class="media-heading">${state.selectedChannel.channelName}</h1>
                        <p class="text-muted">${`${state.selectedChannel.contents.length} contents`}</p>
                      </div>
                      <div class="media-right">
                        ${(state.selectedChannel.subscribed || '') &&
                          yo`
                            <button class="btn btn-danger" onclick=${onToggleSubscribe}>
                              unsubscribe
                            </button>
                          `
                        }
                        ${(!state.selectedChannel.subscribed || '') &&
                          yo`
                          <button class="btn btn-success" onclick=${onToggleSubscribe}>
                            + subscribe
                          </button>
                          `
                        }
                      </div>
                    </div>
                    ${navTabDetails({
                      channel: state.selectedChannel,
                      activeTab: state.activeDetailsTab,
                      onTabSelect: onTabDetailsSelect,
                      colSize: Object.keys(state.subscriptions).length? 'col-sm-4' : 'col-sm-2'
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

  // apply jquery plugin after DOM ready
  $('#search-input-small').typeahead({
    source: channels
  });
}

module.exports = subscriptionPage;
