import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function locationReducer(state = initialState.locations, action) {
  switch (action.type) {
    case types.LOAD_LOCATIONS_SUCCESS:
      return action.locations;

    case types.UPDATE_LOCATION_SUCCESS:
      return [
        ...state.filter(location => location.locationId !== action.location.locationId),
        Object.assign({}, action.location)
      ];

    case types.CREATE_LOCATION_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.location)
      ];

    case types.DELETE_LOCATION_SUCCESS:
      return [
        ...state.filter(location => location.locationId !== action.location.locationId)
      ];

    default:
      return state;
  }
}
