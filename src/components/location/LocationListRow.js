import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const LocationListRow = ({location}) => {
  return(
    <tr>
      <td><Link to={'location/:' + location.locationId}>{location.locationId}</Link></td>
      <td>{location.warehouseId}</td>
      <td>{location.locationType}</td>
      <td>{location.description}</td>
    </tr>
  );
};

LocationListRow.propTypes = {
  location: PropTypes.object.isRequired
};

export default LocationListRow;
