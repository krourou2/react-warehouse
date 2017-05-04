import React, {PropTypes} from 'react';

const SelectInput = ({name, label, onChange, defaultOption, value, error, options}) => {
  const disabled  = Number.parseInt(value) > 0 && name === 'articleId';

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <div className="field">
        { /* Note, value is set here rather than on the option - docs: https://facebook.github*/}
          <select
            name={name}
            value={value}
            onChange={onChange}
            className="form-control"
            disabled={disabled}>
            <option value="">{defaultOption}</option>
            {options.map((option) => {
              return <option key={option.value} value={option.value}>{option.text}</option>;
            })
            }
          </select>
          {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string,
  inventories: PropTypes.array,
  value: PropTypes.string,
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object)
};

SelectInput.defaultProps = {
  defaultOption: '',
  value: '',
  error: '',
  options: [{}]
};

export default SelectInput;
