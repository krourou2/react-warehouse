import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi'; //import courseAPI from mock api
import {beginAjaxCall} from './ajaxStatusActions';

//** ACTION CREATOR **//
export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses: courses};
}

export function createCourseSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function deleteCourseSuccess(course) {
  return { type: types.DELETE_COURSE_SUCCESS, course };
}

//** THUNKS AJAX CALLS **//
//** GRABS COURSES FROM API END POINT **//
export function loadCourses() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return courseApi.getAllCourses().then(courses => {
      dispatch(loadCoursesSuccess(courses));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveCourse(course) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return courseApi.saveCourse(course).then( savedCourse => {
      course.id ? dispatch(updateCourseSuccess(savedCourse)) : dispatch(createCourseSuccess(savedCourse));
    }).catch(error => {
      throw(error);
    });
  };
}

export function deleteCourse(course) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    console.log("IN DELETE COURSE", course);
    return courseApi.deleteCourse(course).then( deletedCourse => {
      console.log("COURSEAPI>DELETECOURSE", deletedCourse);
      dispatch(deleteCourseSuccess(deletedCourse));
    }).catch(error => {
      throw(error);
    });
  };
}
