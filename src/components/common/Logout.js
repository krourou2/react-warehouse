import React, {Component, Proptypes} from 'react';

export default class Logout extends Component {

  render() {
    const { onLogoutClick } = this.props;

    return(
      <button onClick={() => onLogoutClick()} className="btn btn-primary">
        Logout
      </button>
    );
  }
}

Logout.propTypes = {
  onLogoutClick: Proptypes.func.required
};
