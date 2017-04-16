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
    this.redirectToAddlocationPage = this.redirectToAddLocationPage.bind();
  }

  redirectToAddLocationPage() {
    browserHistory.push('/locations');
  }

  render() {
    const {locations} = this.props;

    return (
      <div>
        <h1>Locations</h1>
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
  actions: React.PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    locations: state.locations
  };
}

//** what actions are going to be exposed to props **//
function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(locationActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (LocationsPage);
