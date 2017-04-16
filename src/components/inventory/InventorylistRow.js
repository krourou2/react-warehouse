import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const InventoryListRow = ({inventory}) => {
  return (
    <tr>
      <td><Link to={'/inventory/:' + inventory.inventory_id}>{inventory.inventory_id}</Link></td>
      <td>{inventory.warehouse_id}</td>
      <td>{inventory.article_id}</td>
    </tr>
  );
};

InventoryListRow.propTypes = {
  inventory: PropTypes.object.isRequired
};

export default InventoryListRow;
