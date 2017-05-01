import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';
import {browserHistory} from 'react-router';

class CoursePage extends React.Component {

  //** CONSTRUCTOR INITIALIZES STATE AND CALLS BIND FUNCTIONS **//
  constructor(props, context){
    super(props, context);
    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
  }

  redirectToAddCoursePage() {
    browserHistory.push('/course');
  }

  render () {
    const {courses} = this.props;

    return(
    <div>
      <h1>Courses</h1>
      <input
        type="submit"
        value="Add Course"
        className="btn btn-primary"
        onClick={this.redirectToAddCoursePage} />
      <CourseList courses={courses}/>
    </div>
    );
  }
}

//** PROP TYPE VALIDATION **//
CoursePage.propTypes = {
  courses: React.PropTypes.array.isRequired,
  actions: React.PropTypes.object.isRequired
};

//** what part of state is going to be exposed to props **//
function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses
  };
}

//** what actions are going to be exposed to props **//
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);

