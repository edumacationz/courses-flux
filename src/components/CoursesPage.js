import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

import { loadCourses, removeCourse, loadAuthors } from '../actions';
import { courseStore, authorStore } from '../stores';
import { CourseList } from './CourseList';


export default function CoursesPage() {
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [authors, setAuthors] = useState(authorStore.getAuthors());

  function onChange() {
    setCourses(courseStore.getCourses());
  }

  function onAuthorChange() {
    setAuthors(authorStore.getAuthors());
  }

  function onRemove(course) {
    toast.info(`Removing course ${course.title}`);

    removeCourse(course.id);
  }

  useEffect(() => {
    authorStore.addChangeListener(onAuthorChange);

    if (authors.length === 0) {
      loadAuthors();
    }

    return () => authorStore.removeChangeListener(onAuthorChange);
  }, [authors.length]);

  useEffect(() => {
    courseStore.addChangeListener(onChange);

    if (courses.length === 0) {
      loadCourses();
    }

    return () => courseStore.removeChangeListener(onChange);
  }, [courses.length]);

  return (
    <>
      <Link className='btn btn-primary' to='/courses/new'>Add Course</Link>
      <CourseList getAuthorById={authorStore.getAuthorById} courses={courses} handleRemove={onRemove} />
    </>
  )
}
