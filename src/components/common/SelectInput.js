import PropTypes from 'prop-types';
import React from 'react';

export default function SelectInput({ id, name, label, value, items, itemKey, onChange, error }) {
  const wrapperClass = 'form-group' + error.length > 0 ? ' has-error' : '';

  return (
    <div className={wrapperClass}>
      <label htmlFor={id}>{label}</label>
      <div className="field">
        <select
          id={id}
          name={name}
          className="form-control"
          value={value}
          onChange={onChange}
          error={error}
        >
          <option value="" disabled>Select an Author</option>} />
          {items.map(item => <option key={item.id} value={item.id}>{item[itemKey]}</option>)}

        </select>
      </div>
      {error && (
        <div className='alert alert-danger'>
          {error}
        </div>
      )}
    </div>
  );
}

SelectInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number,
  error: PropTypes.string,
  itemKey: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }))
};

SelectInput.defaultProps = {
  error: '',
  items: [],
  authorId: 0
};