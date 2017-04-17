import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const InventoryListRow = ({inventory}) => {

  return (
    <tr>
      <td><Link to={'/inventory/:' + inventory.inventoryId}>{inventory.inventoryId}</Link></td>
      <td>{inventory.warehouseId}</td>
      <td>{inventory.articleId}</td>
      <td>{inventory.locationTag}</td>
    </tr>
  );
};

InventoryListRow.propTypes = {
  inventory: React.PropTypes.object.isRequired
};

export default InventoryListRow;
