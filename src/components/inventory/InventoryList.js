import React, {PropTypes} from 'react';
import InventoryListRow from './InventorylistRow';

const InventoryList = ({inventories}) => {

  return (
    <table className="table">
      <thead>
      <tr>
        <th>Manage</th>
        <th>Article</th>
        <th>Location</th>
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
  inventories: PropTypes.array.isRequired
};

export default InventoryList;
