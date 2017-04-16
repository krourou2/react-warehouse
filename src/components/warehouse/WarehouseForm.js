import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const WarehouseForm = ({warehouse, onSave, onChange, saving, errors}) => {
  return (
    <form>
      <h1>Manage Warehouse</h1>

      <TextInput
        name="warehouseId"
        label="Warehouse ID"
        value={warehouse.warehouseId}
        onChange={onChange}
        errors={errors.title}/>

      <TextInput
        name="warehouseNumber"
        label="Warehouse Number"
        value={warehouse.warehouseNumber}
        onChange={onChange}
        errors={errors.title}/>

      <TextInput
        name="archiveLength"
        label="Archive Length"
        value={warehouse.archiveLength}
        onChange={onChange}
        errors={errors.title}/>

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave}/>
    </form>
  );
};

WarehouseForm.propTypes = {
  warehouse: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default WarehouseForm;
