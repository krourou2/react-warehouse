import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const LocationListRow = ({location}) => {
  console.log("LSR LOCATION", JSON.stringify(location));
  return(
    <tr>
      <td><Link to={'location/manage/:' + location.locationId}>{location.locationId}</Link></td>
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
