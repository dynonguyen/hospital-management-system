import React from 'react';
import PropTypes from 'prop-types';

function FieldInput({
  name,
  register,
  placeholder,
  errors,
  isLarge,
  type,
  onlyLabel,
  label,
  ...rest
}) {
  return (
    <>
      {label !== '' && (
        <label className="field-cus-label" htmlFor={name}>
          {label}
        </label>
      )}
      <input
        name={name}
        type={type}
        ref={register}
        placeholder={onlyLabel ? '' : placeholder}
        className={`field-cus ${isLarge ? 'large' : ''} ${
          errors ? 'input-error ani-error' : ''
        }`}
        {...rest}
      />
      <p className="text-error">{errors?.message}</p>
    </>
  );
}

FieldInput.propTypes = {
  errors: PropTypes.object,
  onlyLabel: PropTypes.bool,
  label: PropTypes.string,
  isLarge: PropTypes.bool,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  register: PropTypes.any,
  type: PropTypes.string,
};

FieldInput.defaultProps = {
  isLarge: true,
  type: 'text',
  label: '',
  onlyLabel: false,
};

export default FieldInput;
