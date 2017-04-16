import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as locationActions from '../../actions/locationActions';
import LocationForm from './LocationForm';

class ManageLocationPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      location: Object.assign({}, this.props.location),
      errors: {},
      saving: false
    };

    this.updateLocationState = this.updateLocationState.bind(this);
    this.saveLocation = this.saveLocation.bind(this);
  }

  // ran every once in a while to check if props have changed
  componentWillReceiveProps(nextProps) {
    if (this.props.location.locationId != nextProps.location.locationId) {
      // Necessary to populate form when existing course is loaded directly.
      this.setState({location: Object.assign({}, nextProps.location)});
    }
  }

  updateLocationState(event) {
    const field = event.target.name;
    let location = this.state.location;
    location[field] = event.target.value;
    return this.setState({location: location});
  }

  saveLocation(event) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.saveLocation(this.state.location)
      .then( () => this.redirect() );
  }

  redirect() {
    this.setState({saving: false});
    this.context.router.push('/locations');
  }

  render() {
    return (
      <LocationForm
        location={this.state.location}
        onSave={this.saveLocation}
        onChange={this.updateLocationState}
        saving={this.state.saving}
        errors={this.state.errors}
      />
    );
  }
}

ManageLocationPage.propTypes = {
  location: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router
ManageLocationPage.contextTypes = {
  router: PropTypes.object
};

function getLocationById(locations, id) {
  const location = locations.filter(location => location.locationId == id);
  if (location.length) return location[0]; //since filter returns an array, have to grab the first.
  return null;
}

function mapStateToProps(state, ownProps) {
  const locationId = ownProps.params.id.replace(":",""); // from the path '/course/:id'

  let location = {locationId: '', warehouseId: '', locationType: '', description: ''};

  if (locationId && state.locations.length > 0) {
    location = getLocationById(state.locations, locationId);
  }

  return {
    location: location
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(locationActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageLocationPage);
