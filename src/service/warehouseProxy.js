import SCCWarehouseProxy from './sccWarehouseProxy';

const fromDomainModelToViewModel = warehouse => {
  const {Warehouse_ID, Account_ID, Warehouse_Number, Warehouse_Name} = warehouse;
  return {
    warehouseId: Warehouse_ID.toString(),
    accountId: Account_ID.toString(),
    warehouseNumber: Warehouse_Number,
    warehouseName: Warehouse_Name
  };
};

class WarehouseProxy extends SCCWarehouseProxy {
  constructor() {
    super('Warehouse', fromDomainModelToViewModel);
  }
}
export default new WarehouseProxy();
