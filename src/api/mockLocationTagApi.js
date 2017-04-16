import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const locationTags = [
  {
    locationId: 1001,
    zone: "1",
    section: "A",
    number: "1"
  },
  {
    locationId: 1002,
    zone: "1",
    section: "A",
    number: "2"
  },
  {
    locationId: 1003,
    zone: "1",
    section: "A",
    number: "3"
  }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (locationTag) => {
  return replaceAll(locationTag.locationId, ' ', '-');
};

class LocationTagApi {

  static getAllLocationTags() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], locationTags));
      }, delay);
    });
  }

  static saveLocationTag(locationTag) {
    locationTag = Object.assign({}, locationTag);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minLocationIdLength =1;
        if (locationTag.locationID < minLocationIdLength) {
          reject(`Title must be at least ${minLocationIdLength} characters.`);
        }

        if (locationTag.locationId) {
          const existingLocationIndex = locationTags.findIndex(a => a.locationId == locationTag.locationId);
          locationTags.splice(existingLocationIndex, 1, location);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new courses in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          locationTag.locationId(locationTag);
          locationTags.push(locationTag);
        }
      }, delay);
    });
  }

  static deleteLocationTag(locationId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfLocationTagToDelete = locationTags.findIndex(locationTag => {
          locationTag.locationId == locationId;
        });
        locationTags.splice(indexOfLocationTagToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default LocationTagApi;
