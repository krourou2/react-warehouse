import * as types from './actionTypes';
import inventoryApi from '../api/mockInventoryApi'; //import courseAPI from mock api
import {beginAjaxCall} from './ajaxStatusActions';

//** ACTION CREATOR **//
export function loadInventorySuccess(inventory){
  return { type: types.CREATE_INVENTORY_SUCCESS, inventory: inventory};
}

export function updateInventorySuccess(inventory){
  return { type: types.UPDATE_INVENTORY_SUCCESS, inventory: inventory};
}

export function createInventorySuccess(inventory){
  return { type: types.CREATE_INVENTORY_SUCCESS, inventory: inventory};
}

//** THUNKS AJAX CALLS **//
//** GRABS COURSES FROM API END POINT **//
export function loadInventories() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return inventoryApi.getAllInventories().then(inventory => {
      dispatch(loadInventorySuccess(inventory));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveInventory(inventory) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return inventoryApi.saveInventory(inventory).then( savedInventory => {
      inventory.inventory_id ? dispatch(updateInventorySuccess(savedInventory)) : dispatch(createInventorySuccess(savedInventory));
    }).catch(error => {
      throw(error);
    });
  };
}
