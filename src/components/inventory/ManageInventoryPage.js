import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as inventoryActions from '../../actions/inventoryActions';
import InventoryForm from './InventoryForm';

class ManageInventoryPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      inventory: Object.assign({}, this.props.inventory),
      errors: {},
      saving: false
    };

    this.updateInventoryState = this.updateInventoryState.bind(this);
    this.saveInventory = this.saveInventory.bind(this);
  }

  // componentWillMount(){
  //   const {inventory} = this.props;
  //   console.log("CWM INVETORY", inventory);
  //   if(inventory) this.setState({inventory});
  // }

  // ran every once in a while to check if props have changed
  componentWillReceiveProps(nextProps) {
    if (this.props.inventory && this.props.inventory.inventoryId != nextProps.inventory.inventoryId) {
      // Necessary to populate form when existing course is loaded directly.
      this.setState({inventory: Object.assign({}, nextProps.inventory)});
    }
  }

  // updateInventoryState(event) {
  //   const {name, value} = event.target;
  //   const inventory = Object.assign({}, this.state.inventory);
  //   inventory[name] = value;
  //   return this.setState({inventory});
  // }

  updateInventoryState(event) {
    const field = event.target.name;
    let inventory = this.state.inventory;
    inventory[field] = event.target.value;
    return this.setState({inventory: inventory});
  }

  saveInventory(event) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.saveInventory(this.state.inventory)
      .then( () => this.redirect() );
  }

  redirect() {
    this.setState({saving: false});
    this.context.router.push('/inventories');
  }

  render() {
    return (
      <InventoryForm
        inventory={this.state.inventory}
        allTags={this.props.tags}
        allWarehouses={this.props.warehouseNumbers}
        onSave={this.saveInventory}
        onChange={this.updateInventoryState}
        saving={this.state.saving}
        errors={this.state.errors}
      />
    );
  }
}

ManageInventoryPage.propTypes = {
  inventory: PropTypes.object.isRequired,
  tags: PropTypes.array.isRequired,
  warehouseNumbers: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router
ManageInventoryPage.contextTypes = {
  router: PropTypes.object
};

function getInventoryById(inventories, id) {
  return inventories.find(inventory => inventory.inventoryId === id);
}

function mapStateToProps(state, ownProps) {
  const inventoryId = ownProps.params.id.replace(":",""); // from the path '/course/:id'

  let inventory = {inventoryId: '', warehouseId: '', articleId: '', locationTag: ''};

  if (inventoryId && state.inventories.length > 0) {
    inventory = getInventoryById(state.inventories, inventoryId);
  }

  const locationTagsFormattedForDropdown = state.locations.map(location => {
    return {
      value: location.locationId,
      text: location.tag
    };
  });

  // TEMPORARY "1001" accountId until mock user authentication is in place
  const warehouseNumbersFormattedForDropdown = state.warehouses.filter(warehouse => warehouse.accountId === "1001").map( warehouse => {
    return {
      value: warehouse.warehouseId,
      text: warehouse.warehouseNumber
    };
  });

  console.log("WNFFD", JSON.stringify(warehouseNumbersFormattedForDropdown));

  return {
    inventory: inventory,
    tags: locationTagsFormattedForDropdown,
    warehouseNumbers: warehouseNumbersFormattedForDropdown
  };
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(inventoryActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageInventoryPage);
