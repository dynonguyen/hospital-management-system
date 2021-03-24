import PropTypes from 'prop-types';
import React from 'react';

function FieldSelect({
  name,
  register,
  options,
  placeholder,
  defaultValPlaceholder,
  errors,
  isLarge,
  ...rest
}) {
  return (
    <>
      <select
        name={name}
        ref={register}
        defaultValue={defaultValPlaceholder}
        className={`field-cus ${isLarge ? 'large' : ''} ${
          errors ? 'input-error ani-error' : ''
        }`}
        {...rest}>
        <option value={defaultValPlaceholder}>{placeholder}</option>
        {options.map((item, key) => (
          <option value={item.value} key={key}>
            {item.title}
          </option>
        ))}
      </select>
      <p className="text-error">{errors?.message}</p>
    </>
  );
}

FieldSelect.propTypes = {
  errors: PropTypes.object,
  isLarge: PropTypes.bool,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  register: PropTypes.any,
  defaultValPlaceholder: PropTypes.any,
  options: PropTypes.array,
};

FieldSelect.defaultProps = {
  isLarge: true,
  defaultValPlaceholder: -1,
  options: [],
};

export default FieldSelect;
