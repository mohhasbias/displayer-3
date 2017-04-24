var yo = require('yo-yo');
var $ = require('jquery');

// jquery plugin
require('ekko-lightbox');

module.exports = function({ channel }) {
  require('./index.scss');

  $(document).on('click', '[data-toggle="lightbox"]', function(evt) {
    evt.preventDefault();
    $(this).ekkoLightbox();
  });

  return yo`
    <div class="nav-tab-details">
      <ul class="nav nav-pills">
        <li role="presentation" class="active">
          <a href="javascript:;">Contents</a>
        </li>
        <li role="presentation" class="">
          <a href="javascript:;">About Us</a>
        </li>
      </ul>
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
    </div>
  `;
};
