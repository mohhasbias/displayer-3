var diffhtml = require('diffhtml');
var yo = require('yo-yo');
var page = require('page');
var $ = require('jquery');

// jquery plugin
require('bootstrap-3-typeahead');

var layout = require('../../components/layout');
var navTabData = require('../../components/nav-tab-data');

page('/subscriptions', () => {
  subscriptionPage();
});

var activeTabIndex = 0;
function onTabSelect(index) {
  activeTabIndex = index;
  // re-render page
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
  console.log(channels);

  var html = yo`
    ${layout({
      loggedIn: true,
      className: 'subscriptions-page',
      children: yo`
        <div class="container container-subscriptions">
          <div class="row">
            <div class="col-sm-10 col-sm-offset-1">
              <p class="text-center"><strong>YOU HAVEN'T SUBSCRIBE ANY CHANNEL YET</strong></p>
              <form class="search-form">
                <input id="search-input" type="text" placeholder="begin your search" class="form-control input-lg">
              </form>
              <p class="text-center">or filter your channel search by:</p>
              <div class="row">
                <div class="col-sm-6 col-sm-offset-3">
                  ${navTabData({
                    labels: [ 'MOST UPLOADED CONTENT', 'NEWEST CHANNEL' ],
                    data: [ mostUploadedContent, newestChannel ],
                    activeTabIndex: activeTabIndex,
                    onTabSelect: onTabSelect
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      `
    })}
  `;

  diffhtml.innerHTML(document.getElementById('app'), html);

  $('#search-input').typeahead({
    source: channels
  });  
}

module.exports = subscriptionPage;
