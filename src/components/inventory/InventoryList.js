import React, {PropTypes} from 'react';
import InventoryListRow from './InventorylistRow';

const InventoryList = ({inventories}) => {

  return (
    <table className="table">
      <thead>
      <tr>
        <th>Inventory Id</th>
        <th>Warehouse ID</th>
        <th>Article ID</th>
      </tr>
      </thead>
      <tbody>
      {inventories.map(inventory =>
        <InventoryListRow key={inventory.inventory_id}
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
