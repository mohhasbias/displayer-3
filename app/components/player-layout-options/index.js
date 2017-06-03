/* global require, module */

const yo = require('yo-yo');
const store = require('../../shared/store');

const radioButton = require('../radio-button');

// component state
let selectedValue = '';

// component behaviour
function onChange(evt, onSelect) {
  selectedValue = evt.target.value;
  onSelect(selectedValue);
  // notify store
  store.dispatch({
    type: '@@RE-RENDER'
  });  
}

module.exports = function({ options, onSelect, selectedValue }) {
  this.selectedValue = selectedValue;

  require('./index.scss');

  return yo`
    <div class="panel panel-default player-layout-options">
      <div class="panel-heading">
        <h3 class="panel-title">Player Layout</h3>
      </div>
      <div class="list-group">
        ${options.map(option => {
          return yo`
            <div class="list-group-item">
              <div class="list-group-item-text">
                ${option}
                <div class="pull-right btn-right">
                  <button class="btn btn-xs btn-link">
                    ${radioButton({
                      value: option,
                      selectedValue: selectedValue,
                      name: 'player-layout',
                      onChange: (evt) => onChange(evt, onSelect)
                    })}
                  </button>
                </div>
              </div>
            </div>
          `;
        })}
      </div>
    </div>
  `;
};
