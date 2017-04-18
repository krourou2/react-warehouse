import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const InventoryListRow = ({inventory}) => {
  return (
    <tr>
      <td><Link to={'/inventory/:' + inventory.inventoryId}>{inventory.inventoryId}</Link></td>
      <td><Link to={'/warehouse/:' + inventory.warehouse.warehouseId}>{inventory.warehouse.warehouseNumber}</Link></td>
      <td><Link to={'/article/:' + inventory.article.articleId}>{inventory.article.universalProductCode}</Link></td>
      <td><Link to={'location/:' + inventory.location.locationId}>{inventory.location.tag}</Link></td>
    </tr>
  );
};

InventoryListRow.propTypes = {
  inventory: React.PropTypes.object.isRequired
};

export default InventoryListRow;
