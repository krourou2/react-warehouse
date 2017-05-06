import * as types from './actionTypes';
import locationApi from '../api/mockLocationApi'; //import courseAPI from mock api
import {beginAjaxCall} from './ajaxStatusActions';

//** ACTION CREATOR **//
export function loadLocationSuccess(locations){
  return { type: types.LOAD_LOCATIONS_SUCCESS, locations: locations};
}

export function updateLocationSuccess(location){
  return { type: types.UPDATE_LOCATION_SUCCESS, location: location};
}

export function createLocationSuccess(location){
  return { type: types.CREATE_LOCATION_SUCCESS, location: location};
}

export function deleteLocationSuccess(location) {
  return { type: types.DELETE_LOCATION_SUCCESS, location: location };
}

//** THUNKS AJAX CALLS **//
//** GRABS COURSES FROM API END POINT **//
export function loadLocations() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return locationApi.getAllLocations().then(locations => {
      dispatch(loadLocationSuccess(locations));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveLocation(location) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return locationApi.saveLocation(location).then( savedLocation => {
      location.locationId ? dispatch(updateLocationSuccess(savedLocation)) : dispatch(createLocationSuccess(savedLocation));
    }).catch(error => {
      throw(error);
    });
  };
}

export function deleteLocation(location) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return locationApi.deleteLocation(location).then(deletedLocation => {
      dispatch(deleteLocationSuccess(deletedLocation));
    }).catch(error => {
      throw(error);
    });
  };
}
