import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as warehouseActions from '../../actions/warehouseActions';
import WarehouseList from './WarehouseList';
import {browserHistory} from 'react-router';

class WarehousesPage extends React.Component {

  //** CONSTRUCTOR INITIALIZES STATE AND CALLS BIND FUNCTIONS **//
  constructor(props, context){
    super(props, context);
    this.redirectToAddWarehousePage = this.redirectToAddWarehousePage.bind();
  }

  redirectToAddWarehousePage() {
    browserHistory.push('/warehouses');
  }

  render() {
    const {warehouses} = this.props;

    return (
      <div>
        <h1>Warehouses</h1>
        <input
          type="submit"
          value="Add Warehouse"
          className="btn btn-primary"
          onClick={this.redirectToAddWarehousePage} />
        <WarehouseList warehouses={warehouses}/>
      </div>
    );
  }
}

//** PROP TYPE VALIDATION **//
WarehousesPage.propTypes = {
  warehouses: React.PropTypes.array.isRequired,
  actions: React.PropTypes.object.isRequired
};

//** what part of state is going to be exposed to props **//
function mapStateToProps(state, ownProps) {
  return {
    warehouses: state.warehouses
  };
}

//** what actions are going to be exposed to props **//
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(warehouseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (WarehousesPage);
