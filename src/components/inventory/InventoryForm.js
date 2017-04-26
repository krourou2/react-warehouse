import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const InventoryForm = ({inventory, allTags, allWarehouses, onSave, onChange, saving, errors}) => {

  return (
    <form>
      <h1>Manage Inventory</h1>

      <TextInput
        name="warehouseId"
        label="Warehouse ID"
        value={inventory.warehouseId}
        onChange={onChange}
        error={errors.warehouseId}
        disabled  />

      <SelectInput
        name="warehouseNumber"
        label="Warehouse Number"
        value={allWarehouses.warehouseId}
        defaultOption="Select Warehouse Number"
        options={allWarehouses}
        onChange={onChange}
        error={errors.warehouseNumber}/>

      <TextInput
        name="articleId"
        label="Article ID"
        value={inventory.articleId}
        onChange={onChange}
        error={errors.articleId}
        disabled  />

      <SelectInput
        name="locationTag"
        label="Location Tag"
        value={inventory.locationId}
        defaultOption="Select Location Tag"
        options={allTags}
        onChange={onChange}
        error={errors.locationTag}/>

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onChange={onChange}
        onClick={onSave}/>
    </form>
  );
};

InventoryForm.propTypes = {
  inventory: React.PropTypes.object.isRequired,
  allTags: React.PropTypes.array,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object,
  allWarehouses: React.PropTypes.array
};

export default InventoryForm;
