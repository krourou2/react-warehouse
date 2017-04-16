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
    browserHistory.push('/inventory');
  }

  render() {
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
  return {
    inventories: state.inventories
  };
}

//** what actions are going to be exposed to props **//
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(inventoryActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryPage);
