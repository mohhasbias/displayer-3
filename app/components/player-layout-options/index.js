/* global require, module */

const yo = require('yo-yo');

const radioButton = require('../radio-button');

module.exports = function({ options, onSelect }) {
  var onChange = (evt) => {
    console.log(evt.target.value);
    onSelect(evt.target.value);
  }

  return yo`
    <div class="panel panel-default player-layout-options">
      <div class="panel-heading">
        <h3 class="panel-title">Player Layout</h3>
      </div>
      <div class="list-group">
        
        <div class="list-group-item">
          <div class="list-group-item-text">
            2 x 2 Grid
            <div class="pull-right">
              <button class="btn btn-xs btn-link">
                ${radioButton({
                  value: 'option1',
                  selectedValue: 'option2',
                  onChange: onChange
                })}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};
