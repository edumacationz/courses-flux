import { CourseActions } from './actionTypes';

import * as courseApi from '../api/courseApi';

import dispatcher from '../appDispatcher';

export function saveCourses(course) {
  return courseApi.saveCourse(course)
    .then(savedCourse => dispatcher.dispatch({
      type: course.id ? CourseActions.UPDATE_COURSE : CourseActions.CREATE_COURSE,
      payload: savedCourse
    }));
}

export function loadCourses() {
  return courseApi.getCourses()
    .then(courses => {
      dispatcher.dispatch({ type: CourseActions.LOAD_COURSES, payload: courses });
    })
}

export function removeCourse(courseId) {
  return courseApi.deleteCourse(courseId)
    .then(() => {
      dispatcher.dispatch({ type: CourseActions.REMOVE_COURSE, payload: courseId });
    });
}