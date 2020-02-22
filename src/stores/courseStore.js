
import dispatcher from '../appDispatcher';

import { CourseActions } from '../actions/actionTypes';
import Store from './baseStore';

let _courses = [];

class CourseStore extends Store {
  getCourses() {
    return _courses;
  }

  getCourseBySlug(slug) {
    return _courses.find(c => c.slug === slug);
  }
}

dispatcher.register(action => {
  console.log('got course action', action);

  switch (action.type) {
    case CourseActions.UPDATE_COURSE:
      _courses = _courses.map(c => c.id === action.payload.id ? action.payload : c);
      courseStore.emitChange();

      break;
    case CourseActions.CREATE_COURSE:
      _courses.unshift(action.payload);
      courseStore.emitChange();
      break;
    case CourseActions.LOAD_COURSES:
      _courses = action.payload;
      courseStore.emitChange();
      break;
    case CourseActions.REMOVE_COURSE:
      _courses = _courses.filter(c => c.id !== action.payload);
      courseStore.emitChange();
      break;
    default:
      break;
  }
});

export const courseStore = new CourseStore();
