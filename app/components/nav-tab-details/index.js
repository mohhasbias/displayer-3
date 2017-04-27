var yo = require('yo-yo');
var $ = require('jquery');

// load jquery plugin
require('ekko-lightbox');


// apply jquery plugin once
$(document).on('click', '[data-toggle="lightbox"]', function(evt) {
  evt.preventDefault();
  $(this).ekkoLightbox();
});

// render function
module.exports = function({ channel, activeTab, onTabSelect, colSize }) {
  // inject css
  require('./index.scss');

  colSize = colSize || 'col-sm-2';

  return yo`
    <div class="nav-tab-details">
      <ul class="nav nav-pills">
        <li role="presentation" class="${ activeTab === 'Contents'? 'active' : ''}">
          <a href="javascript:;" onclick=${() => onTabSelect('Contents')} >Contents</a>
        </li>
        <li role="presentation" class="${ activeTab === 'About Us'? 'active' : ''}">
          <a href="javascript:;" onclick=${() => onTabSelect('About Us')} >About Us</a>
        </li>
      </ul>
      ${(activeTab === 'Contents' || '') &&
        yo`
          <div class="row content-row">
            ${channel.contents.map((content, idx, contents) => {
              return yo`
                <div class="${colSize}">
                  <a href="${content.url}" data-toggle="lightbox" data-gallery="contents-gallery" data-title="${content.name}">
                    <div class="img-holder">
                      <img src="${content.thumbUrl}" alt="content" data-src="holder.js/150x200">
                    </div>
                    <p class="text-center">${content.name}</p>
                  </a>
                </div>
              `;
            })}
          </div>
        `
      }
      ${(activeTab === 'About Us' || '') &&
        yo`
          <p class="text-center">${channel.about}</p>
        `
      }
    </div>
  `;
};
