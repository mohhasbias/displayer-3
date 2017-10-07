/* global module */
const SET_CAROUSEL_INTERVAL = 'SET_CAROUSEL_INTERVAL';

function setCarouselInterval(interval) {
  return {
    type: SET_CAROUSEL_INTERVAL,
    payload: interval
  };
}

module.exports = {
  SET_CAROUSEL_INTERVAL,

  setCarouselInterval
};