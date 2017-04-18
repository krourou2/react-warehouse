import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const warehouses = [
  {
    warehouseId: "1001",
    accountId: "1001",
    warehouseNumber: "Schroeter01",
    warehouseName: "Schroeter Auto Supply"
  },
  {
    warehouseId: "1002",
    accountId: "1002",
    warehouseNumber: "PapaJohn01",
    warehouseName: "Papa Johns Distrobution"
  },
  {
    warehouseId: "1003",
    accountId: "1003",
    warehouseNumber: "CalahanAuto01",
    warehouseName: "Calahan Auto Parts"
  },
  {
    warehouseId: "1004",
    accountId: "1001",
    warehouseNumber: "Schroeter02",
    warehouseName: "Schroeter Auto Supply 2"
  }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (warehouse) => {
  return replaceAll(warehouse.warehouseId, ' ', '-');
};

class WarehouseApi {
  static getAllWarehouses() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], warehouses));
      }, delay);
    });
  }

  static saveWarehouse(warehouse) {
    warehouse = Object.assign({}, warehouse);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //simulate server-side validation
        const minWarehouseNameLength = 1;
        if (warehouse.warehouseName.length < minWarehouseNameLength) {
          reject(`Title must be at least ${minWarehouseNameLength} characters.`);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new courses in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          warehouse.warehouseId = generateId(warehouse);
          warehouses.push(warehouse);
        }



        if (warehouse.warehouseId) {
          const existingWarehouseIndex = warehouses.findIndex(a => a.warehouseId == warehouse.warehouseId);
          warehouses.splice(existingWarehouseIndex, 1, warehouse);
        }

      }, delay);
    });
  }
}

export default WarehouseApi;
