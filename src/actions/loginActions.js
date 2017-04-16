import * as types from './actionTypes';

import {beginAjaxCall} from './ajaxStatusActions';

//** ACTION CREATOR **//
function requestLogin(creds) {
  return {
    type: types.LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  };
}

function receiveLogin(user) {
  return {
    type: types.LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  };
}

function loginError(message) {
  return {
    type: types.LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  };
}

//Calls the API to get a token and dispatches actions along the way
export function loginUser(creds){

  let config = {
    method: 'POST',
    headers: {'Content-Type' : 'application/x-www-form-urlencoded'},
    body: `username=${creds.username}&password=${creds.password}`
  };

  return dispatch => {
    //We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds));

    return fetch('http://localhost:3001/sessions/create', config)
      .then(response =>
        response.json().then(user => ({ user, response }))
          ).then(({ user, response }) => {
        if(!response.ok) {
          // if there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(user.message));
          return Promise.reject(user);
        } else {
          // If login was successful, set the token in local storage
          localStorage.setItem('id_token', user.id_token);
          //Dispatch the success action
          dispatch(receiveLogin(user));
        }
      }).catch(err => console.log("Error: ", err));
  };

}
