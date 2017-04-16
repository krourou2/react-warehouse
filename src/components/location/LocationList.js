import React, {PropTypes} from 'react';
import LocationListRow from './LocationListRow';

const LocationList = ({locations}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Location ID</th>
          <th>Warehouse ID</th>
          <th>Location Type</th>
          <th>Tag</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
      {locations.map(location =>
        <LocationListRow key={location.locationId} location={location}/>
      )}
      </tbody>
    </table>
  );
};

LocationList.propTypes = {
  locations: PropTypes.array.isRequired
};

export default LocationList;
