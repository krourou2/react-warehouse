import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../../actions/userActions';
import {Link} from 'react-router';

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="jumbotron row">
        <div className="col-lg-8">
          <h1>SCC Warehouse</h1>
          <p>Web Based Inventory Management System.</p>
        </div>
        <div className="col-lg-4">
          {/*<img alt="SCC WAREHOUSE LOGO" src={require('src/images/logo1.png')}/>*/}
        </div>
        <Link to="about" className="btn btn-primary btn-lg" >Learn More</Link>
      </div>
    );
  }
}

HomePage.propTypes = {
  activeUser: React.PropTypes.array,
  actions: PropTypes.object.isRequired
};

//** what part of state is going to be exposed to props **//
function mapStateToProps(state, ownProps) {
  console.log("ACTIVE USER STATE", JSON.stringify(state.activeUser));
  return {
    activeUser: state.activeUser
  };
}

//** what actions are going to be exposed to props **//
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
