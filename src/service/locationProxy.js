import SCCWarehouseProxy from './sccWarehouseProxy';

const fromDomainModelToViewModel = location => {
  const {Location_ID, Warehouse_ID, Location_Type, Description} = location;
  return {
    locationId: Location_ID,
    warehouseId: Warehouse_ID,
    locationType: Location_Type,
    description: Description
  };
};

class LocationProxy extends SCCWarehouseProxy {
  constructor() {
    super('Location', fromDomainModelToViewModel);
  }
}
export default new LocationProxy();
