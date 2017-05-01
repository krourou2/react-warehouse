import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as inventoryActions from '../../actions/inventoryActions';
import InventoryForm from './InventoryForm';

class ManageInventoryPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    console.log("MNG INVENTORY CONSTRUCTOR", JSON.stringify(this.props.inventory));
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
    if (this.props.inventory.inventoryId != nextProps.inventory.inventoryId) {
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
    this.context.router.push('warehouse/inventory/:' + this.props.warehouse.warehouseId);
  }

  render() {
    return (
      <InventoryForm
        inventory={this.state.inventory}
        allTags={this.props.tags}
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
  warehouse: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router
ManageInventoryPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  let inventoryId, inventory;
  const warehouseId = ownProps.params.warehouseId.replace(":","");

  if (ownProps.params.id) {
    inventoryId = ownProps.params.id.replace(":",""); // from the path '/course/:id'
    inventory = state.inventories.find(inventory => inventory.inventoryId === inventoryId);
  } else {
    inventoryId = parseInt(state.inventories[state.inventories.length - 1].inventoryId ) + 1;
    inventory = {inventoryId: inventoryId.toString(), warehouseId: warehouseId, articleId: '', locationTag: ''};
  }

  const locationTagsFormattedForDropdown = state.locations.map(location => {
    return {
      value: location.locationId,
      text: location.tag
    };
  });

  const articleNamesFormattedForDropDown = state.articles.map(article => {
    return {
      value: article.articleId,
      text: article.description
    };
  });

  return {
    inventory: inventory,
    tags: locationTagsFormattedForDropdown,
    warehouse: state.warehouses.find(warehouse => warehouse.warehouseId === warehouseId),
    articleNames: articleNamesFormattedForDropDown
  };
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(inventoryActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageInventoryPage);
