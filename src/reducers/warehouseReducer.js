import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function warehouseReducer(state = initialState.warehouses, action) {
  switch (action.type) {
    case types.LOAD_WAREHOUSES_SUCCESS:
      return action.warehouses;

    case types.UPDATE_WAREHOUSE_SUCCESS:
      return [
        ...state.filter(warehouse => warehouse.warehouseId !== action.warehouse.warehouseId),
        Object.assign({}, action.warehouse)
      ];

    case types.CREATE_WAREHOUSE_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.warehouse)
      ];

    default:
      return state;
  }
}
