import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const InventoryForm = ({inventory, onSave, onChange, saving, errors}) => {
  return (
    <form>
      <h1>Manage Inventory</h1>

      <TextInput
        name="inventoryId"
        label="Inventory ID"
        value={inventory.inventory_id}
        error={errors.title}/>

      <TextInput
        name="warehouseId"
        label="Warehouse ID"
        value={inventory.warehouse_id}
        error={errors.title}/>

      <TextInput
        name="articleId"
        label="Article ID"
        value={inventory.article_id}
        error={errors.title}/>

    </form>
  );
};

InventoryForm.propTypes = {
  inventory: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default InventoryForm;
