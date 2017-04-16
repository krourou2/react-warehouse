import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from './LoadingDots';

const Header = ({loading}) => {
  return (
    <nav>
      <IndexLink to="/" activeClassName="active">Home</IndexLink>
      {" | "}
      <Link to="/courses" activeClassName="active">Courses</Link>
      {" | "}
      <Link to="/about" activeClassName="active">About</Link>
      {" | "}
      <Link to="/inventory" activeClassName="active">Inventory</Link>
      {" | "}
      <Link to="/articles" activeClassName="active">Articles</Link>
      {" | "}
      <Link to="/warehouses" activeClassName="active">Warehouses</Link>
      {" | "}
      <Link to="/locations" activeClassName="active">Locations</Link>
      {loading && <LoadingDots interval={100} dots={20}/>}
    </nav>
  );
};

Header.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default Header;
