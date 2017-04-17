import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as inventoryActions from '../../actions/inventoryActions';
import InventoryForm from './InventoryForm';

class ManageInventoryPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    console.log("CONSTRUCTOR INVENTORY", this.props.inventory);
    this.state = {
      inventory: null,
      errors: {},
      saving: false
    };

    this.updateInventoryState = this.updateInventoryState.bind(this);
    this.saveInventory = this.saveInventory.bind(this);
  }

  componentWillMount(){
    const {inventory} = this.props;
    console.log("CWM INVETORY", inventory);
    if(inventory) this.setState({inventory});
  }

  // ran every once in a while to check if props have changed
  componentWillReceiveProps(nextProps) {
    console.log("CWRP NEXT PROPS", nextProps.inventory);
    console.log("CWRP THIS PROPS", this.props.inventory);
    if (nextProps.inventory && this.props.inventory.inventoryId !== nextProps.inventory.inventoryId) {
      // Necessary to populate form when existing course is loaded directly.
      this.setState({inventory: Object.assign({}, nextProps.inventory)});
    }
  }

  updateInventoryState(event) {
    const {name, value} = event.target;
    console.log("NAME", name);
    console.log("VALUE", value);
    const inventory = Object.assign({}, this.state.inventory);
    inventory[name] = value;
    this.setState({inventory});
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
        onChange={this.updateInventoryState}
        onSave={this.saveInventory}
        inventory={this.state.inventory}
        errors={this.state.errors}
        saving={this.state.saving}
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
  console.log("INVENTORIES", JSON.stringify(inventories));
  console.log("ID", id);
  return inventories.find(inventory => inventory.inventoryId === id);
}

function mapStateToProps(state, ownProps) {
  const inventoryId = ownProps.params.id.replace(":",""); // from the path '/course/:id'
  console.log("INVENTORY ID", inventoryId);
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

  console.log("INVENTORY", inventory);

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
