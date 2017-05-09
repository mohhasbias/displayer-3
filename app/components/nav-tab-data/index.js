/* global require, module */

const yo = require('yo-yo');
const shortid = require('shortid');
const $ = require('jquery');

// render function
module.exports = function({ labels, data, columns, activeTabIndex, onTabSelect, onItemClick }) {
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
          ${data[activeTabIndex] && data[activeTabIndex].map(d => {
            return yo`
              <tr>
                ${columns[activeTabIndex].map(column => {
                  const linkId = shortid.generate();
                  const linkSelector = `#${linkId}`;

                  // append onclick through jquery, because diffhtml doesn't make it
                  $(linkSelector).ready(() => {
                    $(linkSelector).off('click');
                    $(linkSelector).on('click', () => {
                      onItemClick(d.id);
                    });
                  });

                  return yo`
                    <td>
                      <a           
                        id="${linkId}"             
                        href="javascript:;" 
                        class="link-unstyled" 
                      >
                        ${d[column]}
                      </a>
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
