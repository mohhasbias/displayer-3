/* global require, module */
const yo = require('yo-yo');
const shortid = require('shortid');

module.exports = ({ value, selectedValue, onChange }) => {
  var name = shortid.generate();
  var checked = value === selectedValue;

  require('./index.scss');

  return yo`
    <div class="radio">
      <label>
        <input 
          type="radio" 
          name="${name}" 
          value="${value}" 
          ${checked? 'checked="checked"' : ''}
          onchange=${onChange}
        >
        ${(checked || '') &&
          yo`
            <span class="fa-stack fa-lg icon-checked">
              <i class="fa fa-circle-thin fa-stack-2x"></i>
              <i class="fa fa-circle fa-stack-1x"></i>
            </span>
          `
        }
        ${(!checked || '') &&
          yo`<i class="fa fa-circle-thin icon-unchecked"></i>`
        }
      </label>
    </div>
  `;
};
