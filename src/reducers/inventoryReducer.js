import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function inventoryReducer(state = initialState.inventories, action) {
  switch(action.type) {
    case types.LOAD_INVENTORY_SUCCESS:
      return action.inventories;

    case types.UPDATE_INVENTORY_SUCCESS:
      return [
        ...state.filter(inventory => inventory.inventoryId !== action.inventory.inventoryId),
        Object.assign({}, action.inventoryId)
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
