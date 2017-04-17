import React, {PropTypes} from 'react';
import InventoryListRow from './InventorylistRow';

const InventoryList = ({inventories}) => {

  return (
    <table className="table">
      <thead>
      <tr>
        <th>Inventory ID</th>
        <th>Warehouse ID</th>
        <th>Article ID</th>
        <th>Location ID</th>
      </tr>
      </thead>
      <tbody>
      {inventories.map(inventory =>
        <InventoryListRow key={inventory.inventoryId}
                          inventory={inventory}/>
      )}
      </tbody>
    </table>
  );
};

InventoryList.propTypes = {
  inventories: React.PropTypes.array.isRequired
};

export default InventoryList;
