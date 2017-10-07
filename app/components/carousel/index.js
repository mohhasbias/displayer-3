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

  $(() => {
    $(selector).on('slide.bs.carousel', () => {
      // console.log('slide event');
    });
    $(selector).on('slid.bs.carousel', () => {
      // console.log('slid event');
    });
  });

  playlist = playlist || defaultPlaylist;

  require('./index.scss');

  return yo`
    <div id="${refId}" class="carousel slide" data-ride="carousel" data-interval="${carouselSetting.interval}" data-pause="${carouselSetting.pause}">
      <!-- Indicators -->
      ${(playlist.length > 1 || '') &&
        yo`
          <ol class="carousel-indicators">
            ${playlist.map((item, idx) => {
              return yo`
                <li class="${idx === 0? 'active' : ''}" data-target="${selector}" data-slide-to="${idx}"></li>
              `;
            })}
          </ol>
        `
      }

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
              var videoId = shortid.generate();
              var videoSelector = `#${videoId}`;

              $(videoSelector).ready(() => {
                if($(videoSelector).length > 0) {
                  $(videoSelector).get(0).play();
                }
              });

              el = yo`
                <div class="embed-responsive embed-responsive-16by9">
                  <video id="${videoId}" class="embed-responsive-item" src="${item.url}" autoplay loop>
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
