var actions = require('./actions');

const initialState = {
  loggedIn: false
};

module.exports = function(state = initialState, action) {
  switch(action.type) {
    case actions.SET_LOGIN:
      return Object.assign({}, state, {
        loggedIn: action.payload
      });
    default:
      return state;
  }
};