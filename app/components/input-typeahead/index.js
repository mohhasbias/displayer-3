/* global require, module */

const yo = require('yo-yo');
const $ = require('jquery');
const shortid = require('shortid');

// load jquery plugin
require('bootstrap-3-typeahead');

module.exports = function({ source, onSearchInputChange, className, placeholder }) {
  const typeaheadId = shortid.generate();
  const typeaheadSelector = `.typeahead-${typeaheadId}`;

  $(() => {
    $(typeaheadSelector).typeahead('destroy');
    $(typeaheadSelector).typeahead({
      source
    });
  });

  return yo`
    <input 
      type="text" 
      class="form-control typeahead-${typeaheadId} ${className || ''}" 
      autocomplete="off"
      placeholder="${placeholder || ''}"
      onchange=${ evt => onSearchInputChange($(evt.target).typeahead('getActive'))}
      >
  `;  
}
