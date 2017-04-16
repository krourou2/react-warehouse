import * as types from './actionTypes';
import {beginAjaxCall} from './ajaxStatusActions';

function requestLogout() {
  return {
    type: types.LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  };
}

function recieveLogout() {
  return {
    type: types. LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  };
}

// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout());
    localStorage.removeItem('id_token');
    dispatch(recieveLogout());
  };
}
