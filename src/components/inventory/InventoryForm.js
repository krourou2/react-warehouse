import React from 'react';
import SelectInput from '../common/SelectInput';

const InventoryForm = ({inventory, allTags, onSave, onChange, saving, errors, articles}) => {

  return (
    <form>
      <h1>Manage Inventory</h1>

      <SelectInput
        name="articleId"
        label="Article"
        value={inventory.articleId}
        defaultOption="Select Article"
        options={articles}
        onChange={onChange}
        error={errors.articleId}
        entityId={inventory.inventoryId}/>

      <SelectInput
        name="locationId"
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
  articles: React.PropTypes.array.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

InventoryForm.defaultProps = {
  saving: false,
  error: {}
};

export default InventoryForm;
