import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const locations = [
  {
    locationId: 1001,
    warehouseId: 1001,
    locationType: "floor",
    description: "floor location"
  },
  {
    locationId: 1002,
    warehouseId: 1001,
    locationType: "floor",
    description: "floor location"
  },
  {
    locationId: 1003,
    warehouseId: 1001,
    locationType: "floor",
    description: "floor location"
  }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (location) => {
  return replaceAll(location.locationId, ' ', '-');
};

class LocationApi {
  static getAllLocations() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], locations));
      }, delay);
    });
  }

  static saveLocation(location) {
    location = Object.assign({}, location);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minLocationTypeLength =1;
        if (location.locationType.length < minLocationTypeLength) {
          reject(`Title must be at least ${minLocationTypeLength} characters.`);
        }

        if (location.locationId) {
          const existingLocationIndex = locations.findIndex(a => a.locationId == location.locationId);
          locations.splice(existingLocationIndex, 1, location);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new courses in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          location.locationId(location);
          locations.push(location);
        }
      }, delay);
    });
  }

  static deleteLocation(locationId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfLocationToDelete = locations.findIndex(location => {
          location.locationId == locationId;
        });
        locations.splice(indexOfLocationToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default LocationApi;
