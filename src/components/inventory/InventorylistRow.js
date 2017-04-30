import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const InventoryListRow = ({inventory}) => {
  return (
    <tr>
      <td><Link to={'/inventory/manage/:' + inventory.inventoryId}>{inventory.inventoryId}</Link></td>
      <td><Link to={'/warehouse/manage/:' + inventory.warehouse.warehouseId}>{inventory.warehouse.warehouseNumber}</Link></td>
      <td><Link to={'/article/manage/:' + inventory.article.articleId}>{inventory.article.universalProductCode}</Link></td>
      <td><Link to={'location/manage/:' + inventory.location.locationId}>{inventory.location.tag}</Link></td>
    </tr>
  );
};

InventoryListRow.propTypes = {
  inventory: React.PropTypes.object.isRequired
};

export default InventoryListRow;
