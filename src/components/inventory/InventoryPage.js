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
    this.redirectToAddInventoryPage = this.redirectToAddInventoryPage.bind(this);
  }

  redirectToAddInventoryPage() {
    console.log("REDIRECT TO ADD INVENTORY WAREHOUSE ID", this.props.warehouseId);
    browserHistory.push('/inventory/:' + this.props.warehouseId + '/manage/');
  }

  render () {
    const {inventories} = this.props;

    return(
      <div>
        <h1>Inventory in - {this.props.warehouseName}</h1>
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
  warehouseId: React.PropTypes.string.isRequired,
  warehouseName: React.PropTypes.string.isRequired,
  actions: React.PropTypes.object.isRequired
};

//** what part of state is going to be exposed to props **//
function mapStateToProps(state, ownProps) {
  const warehouseId = ownProps.params.id.replace(":","");
  const warehouseName = state.warehouses.find(warehouse => warehouse.warehouseId === warehouseId).warehouseName;
  const inventoriesByWarehouse = state.inventories.filter(inventory => inventory.warehouseId === warehouseId);
  console.log("INVENTORIES WAREHOUSE ID", JSON.stringify(warehouseId));

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

  console.log("WAREHOUSE ID RIGHT BEFORE RETURN", warehouseId);

  return {
    inventories: inventoriesFormattedForPage,
    warehouseId: warehouseId,
    warehouseName: warehouseName
  };
}

//** what actions are going to be exposed to props **//
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(inventoryActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryPage);
