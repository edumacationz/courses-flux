import PropTypes from 'prop-types';
import React from "react";

import TextInput from './common/TextInput';
import SelectInput from './common/SelectInput';

export default function CourseForm({ course, onChange, onSubmit, errors, authors }) {
  console.log('course form', course)
  const { title, category, authorId } = course;

  return (
    <form onSubmit={onSubmit}>
      <TextInput
        id="title"
        name="title"
        label="Title"
        value={title}
        onChange={onChange}
        error={errors.title}
      />

      <SelectInput
        id='authorId'
        name='authorId'
        items={authors}
        itemKey='name'
        label='Author'
        value={authorId}
        onChange={({ target: { name, value } }) => onChange({ target: { name, value: parseInt(value, 10) } })}
        error={errors.authorId}
      />

      <TextInput
        id="category"
        name="category"
        label="Category"
        value={category}
        onChange={onChange}
        error={errors.category}

      />
      <input type="submit" value="Save" className="btn btn-primary" />
    </form>
  );
}

CourseForm.propTypes = {
  course: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  authors: PropTypes.array
};
