import delay from './delay';
import UserProxy from '../service/userProxy';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.

const users = [
  {
    userId: "1001",
    accountId: "1001",
    email: "Donnell.Schroeter@gmail.com",
    password: "warehouse "
  }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (user) => {
  return replaceAll(user.userId, ' ', '-');
};

class UserApi {
  static getAllUsers() {
    console.log("USER PROXY", UserProxy);
    // return UserProxy.Get().then(response => {
    //   console.log("response", JSON.stringify(response));
    //   return response;
    // });
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], users));
      }, delay);
    });
  }

  static saveUser(user) {
    user = Object.assign({}, user);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const minUserIdLength = 4;
        if(user.userId.length < minUserIdLength){
          reject(`User Id must be at least ${minUserIdLength} characters.`);
        } else {
          user.userId = generateId(user);
          users.push(user);
        }

        resolve(user);
      }, delay);
    });
  }

  static deleteUser(userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfUserToDelete = users.findIndex(user => {
          user.userId === userId;
        });
        users.splice(indexOfUserToDelete, 1);
      }, delay);
    });
  }
}

export default UserApi;
