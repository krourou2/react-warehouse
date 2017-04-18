import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const LocationListRow = ({location}) => {
  return(
    <tr>
      <td><Link to={'location/:' + location.locationId}>{location.locationId}</Link></td>
      <td><Link to={'warehouse/:' + location.warehouse.warehouseId}>{location.warehouse.warehouseNumber}</Link></td>
      <td>{location.locationType}</td>
      <td>{location.tag}</td>
      <td>{location.description}</td>
    </tr>
  );
};

LocationListRow.propTypes = {
  location: PropTypes.object.isRequired
};

export default LocationListRow;
