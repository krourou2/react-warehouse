import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const inventories = [
  {
    inventoryId: "1001",
    warehouseId: "1001",
    articleId: "1001",
    locationTag: "1A1"
  },
  {
    inventoryId: "1002",
    warehouseId: "1001",
    articleId: "1002",
    locationTag: "1A2"
  }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//this would be performed on the server in a real app. just stubbing in.
const generateId = (inventory) => {
  return replaceAll(inventory.inventoryId, ' ', '-');
};

class InventoryApi {
  static getAllInventories() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], inventories));
      }, delay);
    });
  }

  static saveInventory(inventory) {
    inventory = Object.assign({}, inventory); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {

        if (inventory.id) {
          const existingInventoryIndex = inventories.findIndex(a => a.inventoryId == inventory.inventoryId);
          inventories.splice(existingInventoryIndex, 1, inventory);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new courses in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          inventory.inventoryId = generateId(inventory);
          inventories.push(inventory);
        }

        resolve(inventory);
      }, delay);
    });
  }

}

export default InventoryApi;
