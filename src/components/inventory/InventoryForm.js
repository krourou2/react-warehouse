import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const InventoryForm = ({allTags, inventory, onSave, onChange, saving, errors}) => {
  return (
    <form>
      <h1>Manage Inventory</h1>

      <TextInput
        name="inventoryId"
        label="Inventory ID"
        value={inventory.inventory_id}
        error={errors.inventory_id}/>

      <TextInput
        name="warehouseId"
        label="Warehouse ID"
        value={inventory.warehouse_id}
        error={errors.warehouse_id}/>

      <TextInput
        name="articleId"
        label="Article ID"
        value={inventory.article_id}
        error={errors.article_id}/>

      <SelectInput
        name="locationTag"
        label="Location Tag"
        value={inventory.location_tag}
        defaultOption="Select Location Tag"
        options={allTags}
        onChange={onChange}
        error={errors.location_tag}/>

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary"
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
