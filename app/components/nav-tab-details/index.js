var yo = require('yo-yo');
var $ = require('jquery');

// jquery plugin
require('ekko-lightbox');

module.exports = function({ channel, activeTab, onTabSelect }) {
  require('./index.scss');

  $(document).on('click', '[data-toggle="lightbox"]', function(evt) {
    evt.preventDefault();
    $(this).ekkoLightbox();
  });

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
          <div class="row">
            ${channel.contents.map((content, idx, contents) => {
              return yo`
                <div class="col-sm-2">
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
