// import { Prompt } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import { courseStore, authorStore } from '../stores';
import CourseForm from './CourseForm';
import { saveCourses, loadCourses, loadAuthors } from "../actions";


export default function ManageCoursePage({ match }) {
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [courseLoaded, setCourseLoaded] = useState(false);
  const [isValidSlug, setIsValidSlug] = useState(true);
  const [errors, setErrors] = useState({});
  const [authors, setAuthors] = useState(authorStore.getAuthors());
  const [course, setCourse] = useState({
    id: null,
    slug: '',
    title: '',
    authorId: '',
    category: ''
  });
  const { slug } = match.params;

  function onChange() {
    setCourses(courseStore.getCourses());
  }

  function onAuthorChange() {
    setAuthors(authorStore.getAuthors());
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
    console.log('slug', slug)

    if (slug === 'new') {
      return setCourseLoaded(true);
    } else if (courses.length === 0) {
      loadCourses();
    } else {
      const foundCourse = courseStore.getCourseBySlug(slug);

      if (foundCourse) {
        setCourse(foundCourse);
      } else {
        setIsValidSlug(false);
      }

      setCourseLoaded(true);
    }

    return () => courseStore.removeChangeListener(onChange);
  }, [courses.length, slug]);

  function formIsValid() {
    const _errors = {};

    if (!course.title) _errors.title = 'Title is required';
    if (!course.authorId) _errors.authorId = 'Author ID is required';
    if (!course.category) _errors.category = 'Category is required';

    setErrors(_errors);

    return Object.keys(_errors).length === 0;
  }

  const history = useHistory();

  function handleChange({ target: { name, value } }) {
    console.log('setting', name, value);

    setCourse({ ...course, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formIsValid()) {
      return;
    }
    saveCourses(course)
      .then(() => {
        toast.success('Course saved!');
        history.push('/courses');
      });
  }

  return (
    <>
      <h2>Manage Course</h2>
      {
        (
          courseLoaded ?
            (isValidSlug
              ? <CourseForm authors={authors} course={course} onChange={handleChange} errors={errors} onSubmit={handleSubmit} />
              : <Redirect to='/not-found' />)
            : <div>Loading course...</div>
        )
      }
      {/* <Prompt when={true} message="Are you sure you want to leave?" /> */}
    </>
  )
}