/* global require, module */
const yo = require('yo-yo');

module.exports = ({ value, selectedValue, name, onChange }) => {
  var checked = value === selectedValue;

  require('./index.scss');

  return yo`
    <div class="radio">
      <label>
        <input 
          type="radio" 
          name="${name}" 
          value="${value}" 
          ${(checked || '') &&
            yo`checked`
          }
          onchange=${onChange}
        >
        ${(checked || '') &&
          yo`
            <span class="fa-stack icon-checked">
              <i class="fa fa-circle-thin fa-stack-2x"></i>
              <i class="fa fa-circle fa-stack-1x"></i>
            </span>
          `
        }
        ${(!checked || '') &&
          yo`
            <span class="fa-stack icon-checked">
              <i class="fa fa-circle-thin fa-stack-2x"></i>
            </span>
          `
        }
      </label>
    </div>
  `;
};
