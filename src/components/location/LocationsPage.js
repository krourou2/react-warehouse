import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as locationActions from '../../actions/locationActions';
import LocationList from './LocationList';
import {browserHistory} from 'react-router';

class LocationsPage extends React.Component {

  //** CONSTRUCTOR INITIALIZES STATE AND CALLS BIND FUNCTIONS **//
  constructor(props, context){
    super(props, context);
    this.redirectToAddlocationPage = this.redirectToAddLocationPage.bind(this);
  }

  redirectToAddLocationPage() {
    browserHistory.push('/location/:' + this.props.warehouseId + '/manage/');
  }

  render() {
    const {locations} = this.props;
    const {warehouseNumber} = this.props;

    return (
      <div>
        <h1>Locations in Warehouse: {warehouseNumber}</h1>
        <input
          type="submit"
          value="Add Location"
          className="btn btn-primary"
          onClick={this.redirectToAddlocationPage}/>
        <LocationList locations={locations}/>
      </div>
    );
  }
}

//** PROP TYPE VALIDATION **//
LocationsPage.propTypes = {
  locations: React.PropTypes.array.isRequired,
  actions: React.PropTypes.object.isRequired,
  warehouseId: React.PropTypes.string.isRequired,
  warehouseNumber: React.PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
    const warehouseId = ownProps.params.id.replace(":",""); // from the path '/course/:id'

    const locations = state.locations.filter(location => location.warehouseId === warehouseId);

  //   const locationsFormattedForPage = locationsByWarehouse.map(location => {
  //   //console.log("LOCATION DURING MAP", JSON.stringify(location));
  //   //const warehouse = state.warehouses.find(warehouse => warehouse.warehouseId === location.warehouseId);
  //
  //   return {
  //     locationId: location.locationId,
  //    // warehouse: warehouse,
  //     locationType: location.locationType,
  //     description: location.description,
  //     tag: location.tag
  //   };
  // });

  //console.log("LFFP LIST", JSON.stringify(locationsFormattedForPage));

  return {
    locations: locations,
    warehouseId: warehouseId,
    warehouseNumber: state.warehouses.find(warehouse => warehouse.warehouseId === warehouseId).warehouseNumber
  };
}

//** what actions are going to be exposed to props **//
function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(locationActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (LocationsPage);
