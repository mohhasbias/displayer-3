/* global require, module */
const { createAction } = require('redux-actions');

const SCHEDULE_ADD_CHANNEL = 'SCHEDULE_ADD_CHANNEL';
const SCHEDULE_REMOVE_CHANNEL = 'SCHEDULE_REMOVE_CHANNEL';

const SCHEDULE_REQUEST = 'SCHEDULE_REQUEST';
const SCHEDULE_RECEIVE = 'SCHEDULE_RECEIVE';
const SCHEDULE_FAIL = 'SCHEDULE_FAIL';

const addChannel = createAction(SCHEDULE_ADD_CHANNEL);
const removeChannel = createAction(SCHEDULE_REMOVE_CHANNEL);

module.exports = {
  // manipulate schedules
  SCHEDULE_ADD_CHANNEL,
  SCHEDULE_REMOVE_CHANNEL,

  // fetch schedules
  SCHEDULE_REQUEST,
  SCHEDULE_RECEIVE,
  SCHEDULE_FAIL,

  // actions creator
  addChannel,
  removeChannel
};
