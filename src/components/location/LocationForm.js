import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const LocationForm = ({location, onSave, onDelete, onChange, saving, errors}) => {
  return (
    <form>
      <h1>Manage Location</h1>

      {/*<TextInput*/}
        {/*name="warehouseId"*/}
        {/*label="Warehouse ID"*/}
        {/*value={location.warehouseId}*/}
        {/*onChange={onChange}*/}
        {/*error={errors.warehouseId}*/}
        {/*disabled={true}/>*/}

      <TextInput
        name="tag"
        label="Location Tag"
        value={location.tag}
        onChange={onChange}
        error={errors.tag}/>

      <TextInput
        name="locationType"
        label="Location Type"
        value={location.locationType}
        onChange={onChange}
        error={errors.locationType}/>

      <TextInput
        name="description"
        label="Description"
        value={location.description}
        onChange={onChange}
        error={errors.description}/>

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onChange={onChange}
        onClick={onSave}/>
      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Deleting...' : 'Delete'}
        className="btn btn-danger"
        onClick={onDelete}/>

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
