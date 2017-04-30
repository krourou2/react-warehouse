import SCCWarehouseProxy from './sccWarehouseProxy';

const fromDomainModelToViewModel = user => {
  const {User_ID, Email, Password, Account_ID} = user;
  return {
    userId: User_ID.toString(),
    accountId: Account_ID.toString(),
    email: Email,
    password: Password
  };
};

class UserProxy extends SCCWarehouseProxy {
  constructor() {
    super('User', fromDomainModelToViewModel);
  }
}
export default new UserProxy();
