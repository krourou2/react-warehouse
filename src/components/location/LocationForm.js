import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const LocationForm = ({location, onSave, onChange, saving, errors}) => {
  return (
    <form>
      <h1>Manage Location</h1>

      <TextInput
        name="locationId"
        label="Location ID"
        value={location.locationId}
        error={errors.title}/>

      <TextInput
        name="warehouseId"
        label="Warehouse ID"
        value={location.warehouseId}
        error={errors.title}/>

      <TextInput
        name="locationTag"
        label="Location Tag"
        value={location.tag}
        error={errors.title}/>

      <TextInput
        name="locationType"
        label="Location ID"
        value={location.locationType}
        error={errors.title}/>

      <TextInput
        name="description"
        label="Description"
        value={location.description}
        error={errors.title}/>

    </form>
  );
};

LocationForm.propTypes = {
  location: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default LocationForm;
