import PropTypes from 'prop-types';
import React from 'react'

export default function TextInput({ id, name, label, value, onChange, error }) {
  const wrapperClass = 'form-group' + error.length > 0 ? ' has-error' : '';


  return (
    <div className={wrapperClass}>
      <label htmlFor={id}>{label}</label>
      <div className="field">
        <input
          id={id}
          type="text"
          name={name}
          className="form-control"
          value={value}
          onChange={onChange}

        />
        {error && <div className='alert alert-danger'>{error}</div>}
      </div>
    </div>
  );
}

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
};

TextInput.defaultProps = {
  error: ''
};