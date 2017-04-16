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
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.saveWarehouse(this.state.warehouse)
      .then( () => this.redirect() );
  }

  redirect() {
    this.setState({saving: false});
    this.context.router.push('./warehouses');
  }

  render() {
    return (
      <WarehouseForm
        warehouse={this.state.warehouse}
        onSave={this.saveWarehouse}
        onChange={this.updateWarehouseState}
        saving={this.state.saving}
        errors={this.state.errors}
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

function getWarehouseById(warehouses, id) {
  const warehouse = warehouses.filter(warehouse => warehouse.warehouseId == id);
  if (warehouse.length) return warehouse[0]; //since filter returns an array, have to grab the first.
  return null;
}

function mapStateToProps(state, ownProps) {
  const warehouseId = ownProps.params.id.replace(":",""); // from the path '/course/:id'

  let warehouse = {warehouseId: '', warehouseNumber: '', warehouseName: '', archiveLength: ''};

  if (warehouseId && state.courses.length > 0) {
    warehouse = getWarehouseById(state.warehouses, warehouseId);
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
