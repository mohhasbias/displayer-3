var yo = require('yo-yo');

// render function
module.exports = function({ labels, data, activeTabIndex, onTabSelect, onItemClick }) {
  // inject css
  require('./index.scss');

  activeTabIndex = activeTabIndex || 0;

  return yo`
    <div class="nav-tab-data">
      <ul class="nav nav-pills nav-justified">
        ${labels.map((label, idx) => {
          return yo`
            <li role="presentation" class="${activeTabIndex === idx? 'active' : ''}">
              <a href="javascript:;" onclick=${() => onTabSelect(idx)}>${label}</a>
            </li>
          `;
        })}
      </ul>
      <table class="table table-hover table-data">
        <tbody>
          ${data[activeTabIndex].map(d => {
            return yo`
              <tr>
                ${Object.keys(d).map((key, idx) => {
                  return yo`
                    <td>
                      <a href="javascript:;" class="link-unstyled" onclick=${onItemClick} >${d[key]}</a>
                    </td>
                  `;
                })}
              </tr>
            `;
          })}
        </tbody>
      </table>
    </div>
  `;
}
