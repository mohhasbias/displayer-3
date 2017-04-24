var yo = require('yo-yo');

module.exports = function({ labels, data, activeTabIndex, onTabSelect }) {
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
      ${(activeTabIndex === 0 || '') && 
        yo`
          <table class="table table-hover">
            <tbody>
              ${data[0].map(d => {
                return yo`
                  <tr>
                    ${Object.keys(d).map((key, idx) => {
                      return yo`
                        <td>
                          ${idx === 0? yo`<strong>${d[key]}</strong>` : d[key]}
                        </td>
                      `;
                    })}
                  </tr>
                `;
              })}
            </tbody>
          </table>
        `
      }
      ${(activeTabIndex === 1 || '') && 
        yo`
          <table class="table table-hover">
            <tbody>
              ${data[1].map(d => {
                return yo`
                  <tr>
                    ${Object.keys(d).map((key, idx) => {
                      return yo`
                        <td>
                          ${idx === 0? yo`<strong>${d[key]}</strong>` : d[key]}
                        </td>
                      `;
                    })}
                  </tr>
                `;
              })}
            </tbody>
          </table>
        `
      }
    </div>
  `;
}
