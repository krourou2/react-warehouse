import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as warehouseActions from '../../actions/warehouseActions';
import WarehouseForm from './WarehouseForm';

class ManageWarehousePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      warehouse: Object.assign({}, this.props.warehouse),
      errors: {},
      saving: false
    };

    this.updateWarehouseState = this.updateWarehouseState.bind(this);
    this.saveWarehouse = this.saveWarehouse.bind(this);
    this.deleteWarehouse = this.deleteWarehouse.bind(this);
  }

  // ran every once in a while to check if props have changed
  componentWillReceiveProps(nextProps) {
    if (this.props.warehouse.warehouseId != nextProps.warehouse.warehouseId) {
      // Necessary to populate form when existing course is loaded directly.
      this.setState({warehouse: Object.assign({}, nextProps.warehouse)});
    }
  }

  updateWarehouseState(event) {
    const field = event.target.name;
    let warehouse = this.state.warehouse;
    warehouse[field] = event.target.value;
    return this.setState({warehouse: warehouse});
  }

  saveWarehouse(event) {
    console.log("SAVE WAREHOUSE", this.state.warehouse);
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.saveWarehouse(this.state.warehouse)
      .then( () => this.redirect() );
  }

  deleteWarehouse(event) {
    event.preventDefault();
    this.setState({ saving: true });

    this.props.actions.deleteWarehouse(this.state.warehouse)
      .then( () => this.redirect() );
  }

  redirect() {
    this.setState({saving: false});
    this.context.router.push('/warehouses');
  }

  render() {
    return (
      <WarehouseForm
        onChange={this.updateWarehouseState}
        warehouse={this.state.warehouse}
        onSave={this.saveWarehouse}
        onDelete={this.deleteWarehouse}
        errors={this.state.errors}
        saving={this.state.saving}
      />
    );
  }
}

ManageWarehousePage.propTypes = {
  warehouse: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router
ManageWarehousePage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  let warehouseId, warehouse;

  console.log("MAX WAREHOUSE ID", parseInt(state.warehouses[state.warehouses.length - 1].warehouseId));
  if (ownProps.params.id && state.warehouses.find(warehouse => warehouse.warehouseId === ownProps.params.id.replace(":",""))){
    warehouseId = ownProps.params.id.replace(":",""); // from the path '/course/:id'
    warehouse = state.warehouses.find(warehouse => warehouse.warehouseId === warehouseId);
  } else {
    warehouseId = parseInt(state.warehouses[state.warehouses.length - 1].warehouseId ) + 1;
    warehouse = {warehouseId: '', accountId: '', warehouseNumber: '', warehouseName: ''};
  }

  return {
    warehouse: warehouse
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(warehouseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageWarehousePage);
