const SET_LOGIN = 'SET_LOGIN';

function setLogin(loginStatus) {
  return {
    type: SET_LOGIN,
    payload: loginStatus
  };
}

function selectPage(rootState) {
  return rootState.page;
}

module.exports = {
  SET_LOGIN,
  setLogin,
  selectPage
};
