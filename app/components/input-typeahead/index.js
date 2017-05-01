/* global require, module */

var yo = require('yo-yo');
var shortid = require('shortid');
var $ = require('jquery');

// load jquery plugin
require('bootstrap-3-typeahead');

module.exports = function({ source, onSearchInputChange, className, placeholder }) {
  const inputId = shortid.generate();
  const selector = `#${inputId}`;

  $(selector).ready(() => {
    $(selector).typeahead('destroy');
    $(selector).typeahead({
      source
    });

    $(selector).off('change');
    $(selector).on('change', function(sel) {
      return () => {
        var item = $(sel).typeahead('getActive');
        onSearchInputChange(item);
      };
    }(selector));
  });

  return yo`
    <input 
      id="${inputId}" 
      type="text" 
      class="form-control ${className || ''}" 
      autocomplete="off"
      placeholder="${placeholder || ''}"
      >
  `;
}
