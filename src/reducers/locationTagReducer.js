import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function locationTagReducer(state = initialState.locationTags, action) {
  switch (action.type) {
    case types.LOAD_LOCATION_TAGS_SUCCESS:
      return action.locationTags;

    case types.UPDATE_LOCATION_TAG_SUCCESS:
      return [
        ...state.filter(location => location.locationId !== action.location.locationId),
        Object.assign({}, action.location)
      ];

    case types.CREATE_LOCATION_TAG_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.location)
      ];

    default:
      return state;
  }
}
