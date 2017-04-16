import * as types from './actionTypes';
import locationTagApi from '../api/mockLocationTagApi'; //import courseAPI from mock api
import {beginAjaxCall} from './ajaxStatusActions';

//** ACTION CREATOR **//
export function loadLocationTagsSuccess(locationTags){
  return { type: types.LOAD_LOCATION_TAGS_SUCCESS, locationTags: locationTags};
}

export function updateLocationTagSuccess(locationTag){
  return { type: types.UPDATE_LOCATION_TAG_SUCCESS, locationTag: locationTag};
}

export function createLocationTagSuccess(locationTag){
  return { type: types.CREATE_LOCATION_TAG_SUCCESS, locationTag: locationTag};
}

//** THUNKS AJAX CALLS **//
//** GRABS COURSES FROM API END POINT **//
export function loadLocationTags() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return locationTagApi.getAllLocationTags().then(locationTags => {
      dispatch(loadLocationTagsSuccess(locationTags));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveLocationTag(locationTag) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return locationTagApi.saveLocationTag(locationTag).then( savedLocationTag => {
      locationTag.locationId ? dispatch(updateLocationTagSuccess(savedLocationTag)) : dispatch(createLocationTagSuccess(savedLocationTag));
    });
  };
}
