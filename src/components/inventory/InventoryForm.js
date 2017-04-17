import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const InventoryForm = ({inventory, allTags, onSave, onChange, saving, errors}) => {
  return (
    <form>
      <h1>Manage Inventory</h1>

      <TextInput
        name="inventoryId"
        label="Inventory ID"
        value={inventory.inventoryId}
        onChange={onChange}
        error={errors.inventory_id}
        disabled  />

      <TextInput
        name="warehouseId"
        label="Warehouse ID"
        value={inventory.warehouseId}
        onChange={onChange}
        error={errors.warehouseId}
        disabled  />

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
        value={inventory.locationTag}
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
  errors: React.PropTypes.object
};

export default InventoryForm;
