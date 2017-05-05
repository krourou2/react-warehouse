import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';

class ManageCoursePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
          course: Object.assign({}, this.props.course),
          errors: {},
          saving: false
        };

        this.updateCourseState = this.updateCourseState.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
    }

    // ran every once in a while to check if props have changed
    componentWillReceiveProps(nextProps) {
      if (this.props.course.id != nextProps.course.id) {
        // Necessary to populate form when existing course is loaded directly.
        this.setState({course: Object.assign({}, nextProps.course)});
      }
    }

    updateCourseState(event) {
      const field = event.target.name;
      let course = this.state.course;
      course[field] = event.target.value;
      return this.setState({course: course});
    }

    saveCourse(event) {
      event.preventDefault();
      this.setState({ saving: true });
      this.props.actions.saveCourse(this.state.course)
        .then( () => this.redirect() );
    }

    deleteCourse(event) {
      event.preventDefault();
      this.setState({ saving: true });
      this.props.actions.deleteCourse(this.state.course)
        .then( () => this.redirect() );
    }

    redirect() {
      this.setState({saving: false});
      this.context.router.push('/courses');
    }

    render() {
      return (
        <CourseForm
          allAuthors={this.props.authors}
          onChange={this.updateCourseState}
          onSave={this.saveCourse}
          onDelete={this.deleteCourse}
          course={this.state.course}
          errors={this.state.errors}
          saving={this.state.saving}
        />
      );
    }
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router
ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  let courseId, course;

  console.log("MAP STATE TO PROPS PARAMS ID", ownProps.params.id.replace(":",""));
  console.log("MAP STATE TO PROPS STATE>COURSES", state.courses);

  if (state.courses.find(course => course.id === ownProps.params.id.replace(":",""))) {
    courseId = ownProps.params.id.replace(":",""); // from the path '/course/:id'
    course = state.courses.find(course => course.id === courseId);
    console.log("MAP STATE TO PROPS COURSE", course);
  } else {
    courseId = 'a new javascript course';
    course = {id: courseId, watchHref: '', title: '', authorId: '', length: '', category: ''};
  }

  const authorsFormattedForDropdown = state.authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });

  return {
      course: course,
      authors: authorsFormattedForDropdown
  };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
