import React from 'react';

import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";

export function CourseList({ getAuthorById, courses, handleRemove }) {
  return (
    <>
      <h1>Courses</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => {
            return (
              <tr key={course.id}>
                <td><Link to={`/courses/${course.slug}`}>{course.title}</Link></td>
                <td>{getAuthorById(course.authorId)?.name}</td>
                <td>{course.category}</td>
                <td>
                  <button className="btn btn-outline-danger" onClick={() => handleRemove(course)}>Delete</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  );
}

CourseList.propTypes = {
  handleRemove: PropTypes.func.isRequired,
  courses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    authorId: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
  })).isRequired
};

// CourseList.defaultProps = {
//   courses: []
// }