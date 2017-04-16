import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function inventoryReducer(state = initialState.inventories, action) {
  switch(action.type) {
    case types.LOAD_INVENTORY_SUCCESS:
      return action.inventories;

    case types.UPDATE_INVENTORY_SUCCESS:
      return [
        ...state.filter(inventory => inventory.inventory_id !== action.inventory.inventory_id),
        Object.assign({}, action.inventory_id)
      ];

    case types.CREATE_INVENTORY_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.inventory)
      ];

    default:
      return state;
  }
}
