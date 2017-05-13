/* global require, module */

const yo = require('yo-yo');
const $ = require('jquery');
const shortid = require('shortid');
const basename = require('basename');
const mime = require('browserify-mime');

// load plugin
require('bootstrap');

const defaultPlaylist = [
  // {
  //   url: 'assets/i/walrus.jpeg'
  // },
  // {
  //   url: 'assets/i/strawberry.jpeg'
  // },
  // {
  //   url: 'assets/i/lion.jpeg'
  // }
  {
    url: 'assets/video/OPD.mp4'
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

  require('./index.scss');

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
            case 'video/mp4':
              el = yo`
                <div class="embed-responsive embed-responsive-16by9">
                  <video class="embed-responsive-item" src="${item.url}" autoplay loop>
                </div>
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
