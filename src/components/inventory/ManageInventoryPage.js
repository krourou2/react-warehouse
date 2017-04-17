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

  // ran every once in a while to check if props have changed
  componentWillReceiveProps(nextProps) {
    if (this.props.inventory.inventory_id != nextProps.inventory.inventory_id) {
      // Necessary to populate form when existing course is loaded directly.
      this.setState({inventory: Object.assign({}, nextProps.inventory)});
    }
  }

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
    this.context.router.push('/inventory');
  }

  render() {
    return (
      <InventoryForm
        allTags={this.props.tags}
        inventory={this.state.inventory}
        onSave={this.saveInventory}
        onChange={this.updateInventoryState}
        saving={this.state.saving}
        errors={this.state.errors}
      />
    );
  }
}

ManageInventoryPage.propTypes = {
  inventory: React.PropTypes.object.isRequired,
  tags: React.PropTypes.array.isRequired,
  actions: React.PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router
ManageInventoryPage.contextTypes = {
  router: PropTypes.object
};

function getInventoryById(inventories, id) {
  const inventory = inventories.filter(inventory => inventory.inventory_id == id);
  if (inventory.length) return inventory[0]; //since filter returns an array, have to grab the first.
  return null;
}

function mapStateToProps(state, ownProps) {
  const inventoryId = ownProps.params.id.replace(":",""); // from the path '/course/:id'

  let inventory = {inventory_id: '', warehouse_id: '', article_id: ''};

  if (inventoryId && state.inventories.length > 0) {
    inventory = getInventoryById(state.inventories, inventoryId);
  }

  const locationTagsFormattedForDropdown = state.locations.map(location => {
    return {
      value: location.locationId,
      tag: location.tag
    };
  });

  return {
    inventory: inventory,
    tags: locationTagsFormattedForDropdown
  };
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(inventoryActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageInventoryPage);
