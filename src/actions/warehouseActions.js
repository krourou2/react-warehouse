import * as types from './actionTypes';
import warehouseApi from '../api/mockWarehouseApi';
import {beginAjaxCall} from './ajaxStatusActions';

//** ACTION CREATOR **//
export function loadWarehouseSuccess(warehouses) {
  return { type: types.LOAD_WAREHOUSES_SUCCESS, warehouses: warehouses};
}

export function updateWarehousesSuccess(warehouse){
  return { type: types.UPDATE_WAREHOUSE_SUCCESS, warehouse: warehouse};
}

export function createWarehouseSuccess(warehouse){
  return { type: types.CREATE_WAREHOUSE_SUCCESS, warehouse: warehouse};
}

//** THUNKS AJAX CALLS **//
//** GRABS COURSES FROM API END POINT **//
export function loadWarehouses() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return warehouseApi.getAllWarehouses().then(warehouses => {
      dispatch(loadWarehouseSuccess(warehouses));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveWarehouse(warehouse) {
  return function (dispatch, getstate) {
    dispatch(beginAjaxCall());
    return warehouseApi.saveWarehouse(warehouse).then( savedWarehouse => {
      warehouse.warehouseId ? dispatch(updateWarehousesSuccess(savedWarehouse)) : dispatch(createWarehouseSuccess(savedWarehouse));
    });
  };
}
