/* global require, module */

const yo = require('yo-yo');
const $ = require('jquery');
const shortid = require('shortid');
const basename = require('basename');
const mime = require('browserify-mime');

// load plugin
require('bootstrap');

const defaultPlaylist = [
  {
    url: 'assets/i/walrus.jpeg'
  },
  {
    url: 'assets/i/strawberry.jpeg'
  },
  {
    url: 'assets/i/lion.jpeg'
  }
];

module.exports = function({ carouselSetting, playlist }) {
  const refId = shortid.generate();
  const selector = `#${refId}`;

  // apply jquery plugin
  $(selector).ready(() => {
    $(selector).carousel(carouselSetting);
  });

  playlist = playlist || defaultPlaylist;

  return yo`
    <div id="${refId}" class="carousel slide" data-ride="carousel" data-interval="${carouselSetting.interval}" data-pause="${carouselSetting.pause}">
      <!-- Indicators -->
      <ol class="carousel-indicators">
        ${playlist.map((item, idx) => {
          return yo`
            <li class="${idx === 0? 'active' : ''}" data-target="${selector}" data-slide-to="${idx}"></li>
          `;
        })}
      </ol>

      <!-- Wrapper for slides -->
      <div class="carousel-inner" role="listbox">
        ${playlist.map((item, idx) => {
          var el;
          switch(mime.lookup(item.url)) {
            case 'image/jpeg':
            case 'image/png':
              el = yo`
                <img src="${item.url}" alt="${basename(item.url)}">
              `;
              break;
            default:
              el = yo`
                <p>${item.url}</p>
              `;
          }

          return yo`
            <div class="item ${idx === 0? 'active': ''}">
              ${el}
            </div>
          `;
        })}
      </div>
    </div>
  `;
};
