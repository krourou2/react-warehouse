import * as types from './actionTypes';
import UserApi from '../api/mockUserApi'; //import courseAPI from mock api
import {beginAjaxCall} from './ajaxStatusActions';

//** ACTION CREATOR **//
export function loadUsersSuccess(users) {
  return { type: types.LOAD_USERS_SUCCESS, users: users};
}

export function createUserSuccess(user) {
  return { type: types.CREATE_USER_SUCCESS, user: user };
}

export function updateUserSuccess(user) {
  return { type: types.UPDATE_USER_SUCCESS, user: user };
}

export function createActiveUserSuccess(user) {
  return { type: types.CREATE_ACTIVE_USER_SUCCESS, user: user };
}

//** THUNKS AJAX CALLS **//
//** GRABS COURSES FROM API END POINT **//
export function loadUsers() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return UserApi.getAllUsers().then(users => {
      dispatch(loadUsersSuccess(users));
    }).catch(error => {
      throw(error);
    });
  };
}

export function createActiveUser() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return UserApi.getAllUsers().then(users => {
      console.log("ACTIVE USER", JSON.stringify(users.filter(user  => user.userId === "1001")));
      dispatch(createActiveUserSuccess(users.find(user  => user.userId === "1001")));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveUser(user) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return UserApi.saveUser(user).then( savedUser => {
      user.userId ? dispatch(updateUserSuccess(savedUser)) : dispatch(createUserSuccess(savedUser));
    }).catch(error => {
      throw(error);
    });
  };
}

