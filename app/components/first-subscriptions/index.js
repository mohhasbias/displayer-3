var yo = require('yo-yo');
var $ = require('jquery');

//jquery plugin
require('bootstrap-3-typeahead');

var navTabData = require('../nav-tab-data');

function onChange(callback) {
  var item = $('#search-input').typeahead('getActive');
  // console.log(item);
  callback(item);
}

module.exports = function({ channels, labels, data, activeTabIndex, onTabSelect, onSearchInputChange, onItemClick }) {
  $(document).ready(() => {
    $('#search-input').typeahead({
      source: channels
    });
  });

  return yo`
    <div>
      <p class="text-center"><strong>YOU HAVEN'T SUBSCRIBE ANY CHANNEL YET</strong></p>
      <form class="search-form">
        <input 
          id="search-input" 
          type="text" 
          placeholder="begin your search" 
          class="form-control input-lg"
          onchange=${() => onChange(onSearchInputChange)}
          autocomplete="off" >
      </form>
      <p class="text-center">or filter your channel search by:</p>
      <div class="row">
        <div class="col-sm-8 col-sm-offset-2">
          ${navTabData({
            labels:labels,
            data: data,
            activeTabIndex: activeTabIndex,
            onTabSelect: onTabSelect,
            onItemClick: onItemClick
          })}
        </div>
      </div>
    </div>
  `;
};
