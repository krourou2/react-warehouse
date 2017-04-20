import SCCWarehouseProxy from './sccWarehouseProxy';

const fromDomainModelToViewModel = location => {
  const {Location_ID, Warehouse_ID, Location_Type, Description, Location_Tag} = location;
  return {
    locationId: Location_ID.toString(),
    warehouseId: Warehouse_ID.toString(),
    locationType: Location_Type,
    description: Description,
    tag: Location_Tag
  };
};

class LocationProxy extends SCCWarehouseProxy {
  constructor() {
    super('Location', fromDomainModelToViewModel);
  }
}
export default new LocationProxy();
