import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const WarehouseListRow = ({warehouse}) => {
  return (
    <tr>
      <td><Link className="glyphicon glyphicon-shopping-cart" to={'warehouse/inventory/:' + warehouse.warehouseId} /></td>
      <td><Link to={'/warehouse/manage/:' + warehouse.warehouseId}>{warehouse.warehouseNumber}</Link></td>
      <td>{warehouse.warehouseName}</td>
      <td><Link className="glyphicon glyphicon-globe" to={'/locations/:' + warehouse.warehouseId}/></td>
    </tr>
  );
};

WarehouseListRow.propTypes = {
  warehouse: PropTypes.object.isRequired
};

export default WarehouseListRow;
