/* global require, module */

const yo = require('yo-yo');

// components
const navTabData = require('../nav-tab-data');
const inputTypeahead = require('../input-typeahead');

// renderer
module.exports = function({ channels, labels, data, columns, activeTabIndex, onTabSelect, onSearchInputChange, onItemClick }) {
  return yo`
    <div class="first-subscriptions">
      <p class="text-center"><strong>YOU HAVEN'T SUBSCRIBE ANY CHANNEL YET</strong></p>
      <form class="search-form">
        ${inputTypeahead({
          source: channels,
          onSearchInputChange: onSearchInputChange,
          placeholder: 'begin your search',
          className: 'input-lg'
        })}
      </form>
      <p class="text-center">or filter your channel search by:</p>
      <div class="row">
        <div class="col-sm-8 col-sm-offset-2">
          ${navTabData({
            labels:labels,
            data: data,
            columns: columns,
            activeTabIndex: activeTabIndex,
            onTabSelect: onTabSelect,
            onItemClick: onItemClick
          })}
        </div>
      </div>
    </div>
  `;
};
