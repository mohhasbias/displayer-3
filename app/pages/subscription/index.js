var diffhtml = require('diffhtml');
var yo = require('yo-yo');
var page = require('page');
var $ = require('jquery');
var holderjs = require('holderjs');

// jquery plugin
require('bootstrap-3-typeahead');

var layout = require('../../components/layout');
var navTabData = require('../../components/nav-tab-data');
var firstSubscriptions = require('../../components/first-subscriptions');
var navTabDetails = require('../../components/nav-tab-details');

page('/subscriptions', () => {
  subscriptionPage();
});

const initialState = {
  activeTabIndex: 0,
  activeDetailsTab: 'Contents',
  subscriptions: [
    // {
    //   "id": "eWRhpRV",
    //   "channelName": "HIMAMMB"
    // }
  ],
  selectedChannel: require('../../../data/channel-details.json')
};

var state = initialState;

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

function onSearchInputChange() {
  setState({
    selectedChannel: require('../../../data/channel-details.json')
  });
}

function onToggleSubscribe() {

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

function setState(partialState) {
  state = Object.assign({}, state, partialState);
  // re-render
  subscriptionPage();
}

function subscriptionPage() {
  require('./index.scss');

  var mostUploadedContent = require('../../../data/most-uploaded-channels.json');
  mostUploadedContent = mostUploadedContent.map( channel => {
    return Object.assign({}, channel, {
      total: `${channel.total} contents`
    });
  });

  var newestChannel = require('../../../data/newest-channels.json');

  var channels = require('../../../data/channels.json');
  channels = channels.map(channel => {
    return Object.assign({}, channel, {
      name: channel.channelName
    });
  });
  // console.log(channels);

  var html = yo`
    ${layout({
      loggedIn: true,
      onLogout: onLogout,
      className: 'subscriptions-page',
      children: yo`
        <div class="container container-subscriptions">
          ${(!state.subscriptions.length || '') &&
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
          ${(state.selectedChannel || '') &&
            yo`
              <div class="row">
                <div class="col-sm-10 col-sm-offset-1">
                  <form>
                    <div class="row">
                      <div class="col-sm-6">
                        <input id="search-input-small" type="text" class="form-control" onchange=${onSearchInputChange} >
                      </div>
                    </div>
                  </form>
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
                      <button class="btn btn-default" onclick=${onToggleSubscribe}>
                        + subscribe
                      </button>
                    </div>
                  </div>
                  ${navTabDetails({
                    channel: state.selectedChannel,
                    activeTab: state.activeDetailsTab,
                    onTabSelect: onTabDetailsSelect
                  })}
                </div>
              </div>
            `}
        </div>
      `
    })}
  `;

  diffhtml.innerHTML(document.getElementById('app'), html);

  $('#search-input-small').typeahead({
    source: channels
  });
}

module.exports = subscriptionPage;
