import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as inventoryActions from '../../actions/inventoryActions';
import InventoryList from './InventoryList';
import {browserHistory} from 'react-router';

class InventoryPage extends React.Component {

  //** CONSTRUCTOR INITIALIZES STATE AND CALLS BIND FUNCTIONS **//
  constructor(props, context){
    super(props, context);
    this.redirectToAddInventoryPage = this.redirectToAddInventoryPage.bind();
  }

  redirectToAddInventoryPage() {
    browserHistory.push('/inventories');
  }

  render () {
    const {inventories} = this.props;

    return(
      <div>
        <h1>Inventory</h1>
        <input
          type="submit"
          value="Add Inventory"
          className="btn btn-primary"
          onClick={this.redirectToAddInventoryPage}/>
        <InventoryList inventories={inventories}/>
      </div>
    );
  }
}

//** PROP TYPE VALIDATION **//
InventoryPage.propTypes = {
  inventories: React.PropTypes.array.isRequired,
  actions: React.PropTypes.object.isRequired
};

//** what part of state is going to be exposed to props **//
function mapStateToProps(state, ownProps) {
  const warehouseId = ownProps.params.id.replace(":","");

  const inventoriesByWarehouse = state.inventories.filter(inventory => inventory.warehouseId === warehouseId);
  console.log("INVENTORIES WAREHOUSE ID", JSON.stringify(inventoriesByWarehouse));
  const inventoriesFormattedForPage = inventoriesByWarehouse.map(inventory => {

    const location = state.locations.find(location => location.locationId === inventory.locationId);
    const article = state.articles.find(article => article.articleId === inventory.articleId);
    const warehouse = state.warehouses.find(warehouse => warehouse.warehouseId === inventory.warehouseId);

    return {
      inventoryId: inventory.inventoryId,
      warehouse: warehouse,
      article: article,
      location: location
    };
  });

  return {
    inventories: inventoriesFormattedForPage
  };
}

//** what actions are going to be exposed to props **//
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(inventoryActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryPage);
