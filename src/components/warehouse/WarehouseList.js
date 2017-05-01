import React, {PropTypes} from 'react';
import WarehouseListRow from './WarehouseListRow';

const WarehouseList = ({warehouses}) => {

  return (
    <table className="table">
      <thead>
      <tr>
        <th>View Inventory</th>
        <th>Number</th>
        <th>Name</th>
        <th>View Locations</th>
      </tr>
      </thead>
      <tbody>
      {warehouses.map(warehouse =>
        <WarehouseListRow key={warehouse.warehouseId} warehouse={warehouse}/>
      )}
      </tbody>
    </table>
  );
};

WarehouseList.propTypes = {
  warehouses: React.PropTypes.array.isRequired
};

export default WarehouseList;
