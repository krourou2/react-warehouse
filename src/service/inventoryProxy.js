import SCCWarehouseProxy from './sccWarehouseProxy';

const fromDomainModelToViewModel = inventory => {
  const {Inventory_ID, Warehouse_ID, Article_ID, Location_ID} = inventory;
  return {
    inventoryId: Inventory_ID.toString(),
    warehouseId: Warehouse_ID.toString(),
    articleId: Article_ID,
    locationId: Location_ID.toString()
  };
};

class InventoryProxy extends SCCWarehouseProxy {
  constructor() {
    super('Inventory', fromDomainModelToViewModel);
  }
}
export default new InventoryProxy();
