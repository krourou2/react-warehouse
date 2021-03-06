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
    this.deleteInventory = this.deleteInventory.bind(this);
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

  deleteInventory(event) {
    event.preventDefault();
    this.setState({ saving: true });
    if (this.props.newInventoryPiece === false) {
      this.props.actions.deleteInventory(this.state.inventory)
        .then( () => this.redirect() );
    } else {
      alert("Cannot delete inventory that has not been created yet.");
      this.setState({ saving: false });
    }
  }

  redirect() {
    this.setState({saving: false});
    this.context.router.push('warehouse/inventory/:' + this.props.warehouse.warehouseId);
  }

  render() {
    return (
      <InventoryForm
        newInventoryPiece={this.props.newInventoryPiece}
        inventory={this.state.inventory}
        allTags={this.props.tags}
        onSave={this.saveInventory}
        onDelete={this.deleteInventory}
        onChange={this.updateInventoryState}
        saving={this.state.saving}
        errors={this.state.errors}
        articles={this.props.articles}
      />
    );
  }
}

ManageInventoryPage.propTypes = {
  newInventoryPiece: PropTypes.bool.isRequired,
  inventory: PropTypes.object.isRequired,
  tags: PropTypes.array.isRequired,
  warehouse: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  articles: PropTypes.array.isRequired
};

//Pull in the React Router context so router is available on this.context.router
ManageInventoryPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  let inventoryId, inventory, newInventoryPiece;
  const warehouseId = ownProps.params.warehouseId.replace(":","");

  if (ownProps.params.id && state.inventories.find(inventory => inventory.inventoryId === ownProps.params.id.replace(":", ""))) {
    newInventoryPiece = false;
    inventoryId = ownProps.params.id.replace(":",""); // from the path '/course/:id'
    inventory = state.inventories.find(inventory => inventory.inventoryId === inventoryId);
  } else {
    newInventoryPiece = true;
    inventoryId = parseInt(state.inventories[state.inventories.length - 1].inventoryId ) + 1;
    inventory = {inventoryId: inventoryId.toString(), warehouseId: warehouseId, articleId: '', locationTag: ''};
  }

  const locationsByWarehouse = state.locations.filter(location => location.warehouseId === warehouseId);

  const locationTagsFormattedForDropdown = locationsByWarehouse.map(location => {
    return {
      value: location.locationId,
      text: location.tag
    };
  });

  //const articlesByAccount = state.articles.filter(article => article.accountId === state.activeUser.accountId);
  const articleNamesFormattedForDropDown = state.articles.filter(article => article.accountId === state.activeUser[0].accountId).map(article => {
    return {
      value: article.articleId,
      text: article.description
    };
  });

  return {
    newInventoryPiece: newInventoryPiece,
    inventory: inventory,
    tags: locationTagsFormattedForDropdown,
    warehouse: state.warehouses.find(warehouse => warehouse.warehouseId === warehouseId),
    articles: articleNamesFormattedForDropDown
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(inventoryActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageInventoryPage);
