import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const WarehouseListRow = ({warehouse}) => {
  return (
    <tr>
      <td><Link to={'/warehouse/:' + warehouse.warehouseId}>{warehouse.warehouseNumber}</Link></td>
      <td>{warehouse.warehouseName}</td>
      <td>{warehouse.archiveLength}</td>
    </tr>
  );
};

WarehouseListRow.propTypes = {
  warehouse: PropTypes.object.isRequired
};

export default WarehouseListRow;
