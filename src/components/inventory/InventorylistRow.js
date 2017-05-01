import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const InventoryListRow = ({inventory}) => {
  return (
    <tr>
      <td><Link className="glyphicon glyphicon-plus" to={'/inventory/:' + inventory.warehouse.warehouseId + '/manage/:' + inventory.inventoryId} /></td>
      <td><Link to={'/article/manage/:' + inventory.article.articleId}>{inventory.article.universalProductCode} - {inventory.article.description}</Link></td>
      <td><Link to={'location/:' + inventory.warehouseId + '/manage/:' + inventory.location.locationId}>{inventory.location.tag}</Link></td>
    </tr>
  );
};

InventoryListRow.propTypes = {
  inventory: React.PropTypes.object.isRequired
};

export default InventoryListRow;
